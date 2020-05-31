using System;

namespace Chat.Models
{
    public class Message
    {
        public string? SenderName { get; set; }
        public string? Text { get; set; }
        public DateTime SendDate { get; set; }
    }
}
