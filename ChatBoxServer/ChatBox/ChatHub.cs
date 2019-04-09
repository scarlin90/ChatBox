using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatBox
{
    public class ChatHub : Hub
    {
        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("SendMessage", user, message);
        }

        public Task SendUserStatusUpdate(string user)
        {
            return Clients.All.SendAsync("SendUserStatusUpdate", user);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("OnConnectedAsync", $"{Context.ConnectionId}");
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.Others.SendAsync("SendMessage", "test" , $"{Context.ConnectionId} left");
        }

        public Task Send(string message)
        {
            return Clients.All.SendAsync("Send", $"{Context.ConnectionId}: {message}");
        }
        public Task CreateGroup(string groupName)
        {
            return Clients.All.SendAsync("receiveCreateGroup", $"{groupName}");
        }

        public Task SendUserConnection(string user)
        {
            return Clients.Others.SendAsync("recieveUserConnection", $"{user}");
        }

        public Task SendToConnection(string connectionId, string message)
        {
            return Clients.Client(connectionId).SendAsync("receivePrivateMessage", $"{message}");
        }

        public Task SendToGroup(string groupName, string message)
        {
            return Clients.Group(groupName).SendAsync("receiveSendGroupMessage", $"{message}");
        }

        public Task SendToOthersInGroup(string groupName, string message)
        {
            return Clients.OthersInGroup(groupName).SendAsync("receiveOthersGroupMessage", groupName , $"{message}");
        }

        public async Task JoinGroup(string connectionId, string groupName)
        {
            await Groups.AddToGroupAsync(connectionId, groupName);

            await Clients.Group(groupName).SendAsync("receiveJoinGroupMessage", $"{groupName}");
        }

        public async Task LeaveGroup(string connectionId, string groupName)
        {
            await Clients.Group(groupName).SendAsync("Send", $"{groupName}");

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public Task Echo(string message)
        {
            return Clients.Caller.SendAsync("getMyConnection", $"{Context.ConnectionId}");
        }
    }
}
