using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Models
{
    public class Message
    {
        public string clientId { get; set; }
        public string? message { get; set; }
        public DateTime date { get; set; }
    }
}
