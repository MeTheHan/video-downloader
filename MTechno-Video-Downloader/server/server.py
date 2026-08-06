"""Video Downloader Server by MTechno - https://youtube.com/@MTechnoW"""
import asyncio,os,uuid,shutil,time
from pathlib import Path
from aiohttp import web
import aiohttp_cors
import yt_dlp

tasks={}
DOWNLOAD_DIR=Path("./downloads")
DOWNLOAD_DIR.mkdir(exist_ok=True)
HAS_FFMPEG=shutil.which("ffmpeg") is not None
IDLE_TIMEOUT=300
last_request_time=time.time()

def touch():
    global last_request_time
    last_request_time=time.time()

def get_format(fmt):
    if HAS_FFMPEG:
        return {"best":"bestvideo+bestaudio/best","1080p":"bestvideo[height<=1080]+bestaudio/best[height<=1080]","720p":"bestvideo[height<=720]+bestaudio/best[height<=720]","bestaudio":"bestaudio"}.get(fmt,"bestvideo+bestaudio/best")
    return {"best":"best","1080p":"best[height<=1080]/best","720p":"best[height<=720]/best","bestaudio":"bestaudio"}.get(fmt,"best")

async def status_handler(r):
    touch()
    return web.json_response({"status":"running","version":"5.0.0","author":"MTechno","ffmpeg":HAS_FFMPEG})

async def info_handler(r):
    touch()
    data=await r.json()
    url=data.get("url")
    if not url:return web.json_response({"error":"URL required"},status=400)
    try:
        with yt_dlp.YoutubeDL({"quiet":True,"no_warnings":True}) as ydl:
            info=ydl.extract_info(url,download=False)
        return web.json_response({"title":info.get("title"),"duration":info.get("duration"),"uploader":info.get("uploader"),"thumbnail":info.get("thumbnail")})
    except Exception as e:
        return web.json_response({"error":str(e)},status=500)

async def download_handler(r):
    touch()
    data=await r.json()
    url,fmt,outdir=data.get("url"),data.get("format","best"),data.get("output_dir","./downloads")
    if not url:return web.json_response({"error":"URL required"},status=400)
    tid=str(uuid.uuid4())
    tasks[tid]={"status":"queued","progress":0,"speed":"","eta":"","error":None,"filename":None,"title":None}
    asyncio.create_task(run_download(tid,url,fmt,outdir))
    return web.json_response({"task_id":tid,"status":"queued"})

async def progress_handler(r):
    touch()
    tid=r.match_info.get("task_id")
    if tid not in tasks:return web.json_response({"error":"Not found"},status=404)
    return web.json_response(tasks[tid])

def hook(tid,d):
    if tid not in tasks:return
    if d["status"]=="downloading":
        total=d.get("total_bytes") or d.get("total_bytes_estimate",0)
        dl=d.get("downloaded_bytes",0)
        pct=(dl/total*100) if total>0 else 0
        tasks[tid].update({"status":"downloading","progress":round(pct,1),"speed":d.get("_speed_str",""),"eta":d.get("_eta_str","")})
    elif d["status"]=="finished":
        tasks[tid].update({"status":"processing","progress":100})

async def run_download(tid,url,fmt,outdir):
    touch()
    os.makedirs(outdir,exist_ok=True)
    opts={"format":get_format(fmt),"outtmpl":os.path.join(outdir,"%(title)s.%(ext)s"),"progress_hooks":[lambda d:hook(tid,d)],"quiet":True,"no_warnings":True}
    if HAS_FFMPEG:
        opts["merge_output_format"]="mp4"
        if fmt=="bestaudio":
            opts["postprocessors"]=[{"key":"FFmpegExtractAudio","preferredcodec":"mp3","preferredquality":"192"}]
            opts["merge_output_format"]=None
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            info=ydl.extract_info(url,download=True)
            fn=ydl.prepare_filename(info)
            if fmt=="bestaudio" and HAS_FFMPEG:fn=fn.rsplit(".",1)[0]+".mp3"
            tasks[tid].update({"status":"completed","progress":100,"filename":fn,"title":info.get("title")})
    except Exception as e:
        tasks[tid].update({"status":"error","error":str(e)})

async def idle_watcher(app):
    while True:
        await asyncio.sleep(15)
        if time.time()-last_request_time>IDLE_TIMEOUT:
            print("\n  Idle timeout. Server shutting down.")
            raise web.GracefulExit()

async def on_startup(app):
    app['watcher']=asyncio.create_task(idle_watcher(app))

async def on_cleanup(app):
    app['watcher'].cancel()

def create_app():
    app=web.Application()
    app.router.add_get("/status",status_handler)
    app.router.add_post("/info",info_handler)
    app.router.add_post("/download",download_handler)
    app.router.add_get("/progress/{task_id}",progress_handler)
    app.on_startup.append(on_startup)
    app.on_cleanup.append(on_cleanup)
    cors=aiohttp_cors.setup(app,defaults={"*":aiohttp_cors.ResourceOptions(allow_credentials=True,expose_headers="*",allow_headers="*",allow_methods="*")})
    for route in list(app.router.routes()):cors.add(route)
    return app

if __name__=="__main__":
    print("="*50)
    print("  Video Downloader Server v5.0")
    print("  by MTechno")
    print(f"  FFmpeg: {'OK' if HAS_FFMPEG else 'Missing (fallback mode)'}")
    print(f"  Idle timeout: {IDLE_TIMEOUT}s")
    print(f"  http://localhost:8765")
    print("="*50)
    web.run_app(create_app(),host="0.0.0.0",port=8765)
