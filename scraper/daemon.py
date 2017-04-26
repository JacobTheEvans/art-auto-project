import scraper
import time

def uploadLoop():
    print("[+] Starting daemon.py")
    while True:
        scraper.main()
        time.sleep(300)

if __name__ == "__main__":
    uploadLoop()
