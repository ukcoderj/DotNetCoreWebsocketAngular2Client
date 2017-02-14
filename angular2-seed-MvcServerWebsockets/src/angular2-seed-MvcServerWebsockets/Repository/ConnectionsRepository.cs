using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;

namespace angular2_seed_MvcServerWebsockets.Repository
{
	public interface IConnectionsRepository
	{
		Dictionary<string, WebSocket> ConnectionsDct { get; set; }

		void Add(string id, WebSocket socket);
	}


	/// <summary>
	/// This is a quick and dirty way of storing connections (in place of a db)
	/// The client will make a key using a cookie. We can then use that to identify them
	/// In case we wish to send specific messages.
	/// YOU CAN GET MULTIPLE INSTANCES - SO USE A DB FOR LIVE!
	/// </summary>
	public class ConnectionsRepository : IConnectionsRepository
	{
		private static ConnectionsRepository _instance;

		public static ConnectionsRepository Instance()
		{
			if (_instance == null)
				_instance = new ConnectionsRepository();
			return _instance;
		}


		public Dictionary<string, WebSocket> ConnectionsDct { get; set; }

		private ConnectionsRepository()
		{
			ConnectionsDct = new Dictionary<string, WebSocket>();
		}


		public void Add(string id, WebSocket socket)
		{
			if(!ConnectionsDct.ContainsKey(id))
			{
				ConnectionsDct.Add(id, socket);
			}
			else
			{
				ConnectionsDct[id] = socket;
			}

		}
	}
}
