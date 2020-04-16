using Chat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendAll(Message message)
        {
            await Clients.All.SendAsync("ReceiveAllMessages", message);
        }

        public async Task Send(string userConnectionId, Message message)
        {
            await Clients.Client(userConnectionId).SendAsync("ReceiveMessage", message);
            //await Clients.User(user).SendAsync("ReceiveMessage", message);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
