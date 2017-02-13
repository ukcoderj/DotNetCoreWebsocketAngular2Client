using System.Net.WebSockets;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;
using System.Text;

namespace angular2_seed_MvcServerWebsockets
{
	public class SocketHandler
	{
		public const int BufferSize = 4096;

		WebSocket socket;

		SocketHandler(WebSocket socket)
		{
			this.socket = socket;
		}

		async Task EchoLoop()
		{
			var buffer = new byte[BufferSize];
			var seg = new ArraySegment<byte>(buffer);

			while (this.socket.State == WebSocketState.Open)
			{
				var token = CancellationToken.None;
				var buffer1 = new ArraySegment<Byte>(new Byte[4096]);
				var received = await this.socket.ReceiveAsync(buffer1, token);
				string requestAsText = Encoding.UTF8.GetString(buffer1.Array, buffer1.Offset, buffer1.Count);
				requestAsText = requestAsText.Replace("\0", "");


				var responseText = "Server-" + requestAsText;
				var type = WebSocketMessageType.Text;
				var data = Encoding.UTF8.GetBytes(responseText);
				var returnbuffer = new ArraySegment<Byte>(data);
				await socket.SendAsync(returnbuffer, type, true, token);


				// quick reflector
				//var incoming = await this.socket.ReceiveAsync(seg, CancellationToken.None);
				//var outgoing = new ArraySegment<byte>(buffer, 0, incoming.Count);
				//await this.socket.SendAsync(outgoing, WebSocketMessageType.Text, true, CancellationToken.None);
			}
		}

		static async Task Acceptor(HttpContext hc, Func<Task> n)
		{
			// not used, but could do to send messages to specific connections.
			// Could use a collection lookup
			var connectionIdentifierCookie = hc.Request.Cookies["my_id_cookie"];
			//send to a lookup of type [connectionIdentifierCookie, this.socket]

			if (!hc.WebSockets.IsWebSocketRequest)
				return;

			var socket = await hc.WebSockets.AcceptWebSocketAsync();
			var h = new SocketHandler(socket);
			await h.EchoLoop();
		}


		public static void Map(IApplicationBuilder app)
		{
			app.UseWebSockets();
			app.Use(SocketHandler.Acceptor);
		}




	}
}
