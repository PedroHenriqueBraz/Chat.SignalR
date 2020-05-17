using Chat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat.Hubs
{
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            //await Clients.All.SendAsync("NewParticipant", Context.UserIdentifier);
            await Clients.Others.SendAsync("NewParticipant", Context.UserIdentifier);
        }

        public async Task SendAll(Message message)
        {
            message.SenderName = Context.UserIdentifier;
            await Clients.All.SendAsync("ReceiveAllMessages", message);
        }

        public async Task SendPrivate(string id, Message message)
        {
            message.SenderName = Context.UserIdentifier;
            await Clients.User(id).SendAsync("ReceivePrivateMessages", message);
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }
}
