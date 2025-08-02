#!/usr/bin/env python3
"""
BHEM Icon Wall Generator - 启动脚本
快速启动本地HTTP服务器来运行BHEM图标墙生成器
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import time
from pathlib import Path

# 配置
DEFAULT_PORT = 8080
SERVER_DIR = "main-code"

def check_files():
    """检查必要文件是否存在"""
    print("🔍 检查项目文件...")
    
    required_files = [
        f"{SERVER_DIR}/index.html",
        f"{SERVER_DIR}/script.js", 
        f"{SERVER_DIR}/debug.js",
        f"{SERVER_DIR}/bhem-icon"
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("❌ 以下必要文件缺失:")
        for file in missing_files:
            print(f"   - {file}")
        return False
    
    # 检查图标文件数量
    icon_dir = Path(f"{SERVER_DIR}/bhem-icon")
    if icon_dir.exists():
        icon_count = len([f for f in icon_dir.glob("*.png")])
        print(f"✅ 找到 {icon_count} 个图标文件")
    
    print("✅ 所有必要文件检查完成")
    return True

def find_available_port(start_port=DEFAULT_PORT):
    """查找可用端口"""
    import socket
    
    for port in range(start_port, start_port + 10):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    
    print(f"❌ 无法找到可用端口 (尝试了 {start_port}-{start_port+9})")
    return None

def start_server(port):
    """启动HTTP服务器"""
    # 切换到main-code目录
    if not os.path.exists(SERVER_DIR):
        print(f"❌ 目录 '{SERVER_DIR}' 不存在")
        return False
    
    original_dir = os.getcwd()
    os.chdir(SERVER_DIR)
    
    try:
        # 自定义处理器，添加正确的MIME类型
        class BHEMHandler(http.server.SimpleHTTPRequestHandler):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, directory='.', **kwargs)
            
            def end_headers(self):
                # 添加CORS头部，允许本地开发
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', '*')
                super().end_headers()
            
            def log_message(self, format, *args):
                # 简化日志输出
                print(f"📡 {self.address_string()} - {format % args}")
        
        with socketserver.TCPServer(("", port), BHEMHandler) as httpd:
            print(f"🚀 BHEM Icon Wall Generator 服务器启动成功!")
            print(f"📍 服务地址: http://localhost:{port}")
            print(f"📁 服务目录: {os.getcwd()}")
            print(f"🌐 在浏览器中访问上述地址")
            print()
            print("💡 提示:")
            print("   - 按 Ctrl+C 停止服务器")
            print("   - 确保浏览器支持现代JavaScript和Canvas API")
            print("   - 如需更改端口，请编辑 start.py 文件")
            print()
            print("⏳ 服务器运行中...")
            
            # 自动打开浏览器 (可选)
            try:
                time.sleep(1)  # 等待服务器完全启动
                webbrowser.open(f"http://localhost:{port}")
                print("🌐 已自动打开浏览器")
            except Exception:
                print("🌐 请手动在浏览器中打开 http://localhost:{port}")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
        return True
    except Exception as e:
        print(f"❌ 服务器启动失败: {e}")
        return False
    finally:
        os.chdir(original_dir)

def main():
    """主函数"""
    print("=" * 50)
    print("🎨 BHEM Icon Wall Generator")
    print("   Black Heritage Experience Manitoba")
    print("=" * 50)
    print()
    
    # 检查Python版本
    if sys.version_info < (3, 6):
        print("❌ 需要 Python 3.6 或更高版本")
        sys.exit(1)
    
    # 检查必要文件
    if not check_files():
        print("\n❌ 文件检查失败，请确保项目结构正确")
        print("📁 期望的项目结构:")
        print("   bhem-icon-wall-generator/")
        print("   ├── start.py")
        print("   └── main-code/")
        print("       ├── index.html")
        print("       ├── script.js") 
        print("       ├── debug.js")
        print("       └── bhem-icon/")
        sys.exit(1)
    
    # 查找可用端口
    port = find_available_port()
    if port is None:
        sys.exit(1)
    
    if port != DEFAULT_PORT:
        print(f"⚠️  默认端口 {DEFAULT_PORT} 被占用，使用端口 {port}")
    
    # 启动服务器
    print()
    success = start_server(port)
    
    if success:
        print("\n✅ 服务器正常退出")
    else:
        print("\n❌ 服务器异常退出")
        sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 再见!")
    except Exception as e:
        print(f"\n💥 意外错误: {e}")
        sys.exit(1)