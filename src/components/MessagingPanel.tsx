
import { useState } from "react";
import { Send, Paperclip, Phone, Video, MoreVertical, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: string;
  supplier: {
    name: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  product?: string;
}

interface Message {
  id: string;
  sender: "buyer" | "supplier";
  content: string;
  timestamp: string;
  type: "text" | "image" | "file";
}

const MessagingPanel = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      supplier: {
        name: "Shenzhen Tech Manufacturing",
        avatar: "/placeholder.svg",
        online: true
      },
      lastMessage: "Yes, we can provide custom packaging for your order.",
      timestamp: "2 min ago",
      unread: 2,
      product: "LED Display Panel"
    },
    {
      id: "2",
      supplier: {
        name: "Precision Machinery Ltd",
        avatar: "/placeholder.svg",
        online: false
      },
      lastMessage: "Please find the detailed quotation attached.",
      timestamp: "1 hour ago",
      unread: 0,
      product: "CNC Machining Center"
    },
    {
      id: "3",
      supplier: {
        name: "Green Textiles Group",
        avatar: "/placeholder.svg",
        online: true
      },
      lastMessage: "Our minimum order quantity is 500 meters.",
      timestamp: "3 hours ago",
      unread: 1,
      product: "Organic Cotton Fabric"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "buyer",
      content: "Hello, I'm interested in your LED Display Panel. Can you provide more details about the specifications?",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: "2",
      sender: "supplier",
      content: "Hello! Thank you for your interest. Our LED Display Panel features Full HD resolution, IP65 rating, and comes with 3-year warranty. What's your target quantity?",
      timestamp: "10:32 AM",
      type: "text"
    },
    {
      id: "3",
      sender: "buyer",
      content: "I need about 50 units for a retail project. Can you provide custom packaging?",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: "4",
      sender: "supplier",
      content: "Yes, we can provide custom packaging for your order. For 50 units, the price would be $140 per unit including custom packaging. Delivery time is 15-20 days.",
      timestamp: "10:38 AM",
      type: "text"
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Messages</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 h-8"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {!selectedConversation ? (
          // Conversation List
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversation.supplier.avatar} />
                      <AvatarFallback>{conversation.supplier.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.supplier.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.supplier.name}
                      </p>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    {conversation.product && (
                      <p className="text-xs text-blue-600 mb-1">{conversation.product}</p>
                    )}
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <Badge className="bg-blue-600 hover:bg-blue-700 min-w-[20px] h-5 flex items-center justify-center text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          // Chat View
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="border-b p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedConversation(null)}
                  className="p-1"
                >
                  ←
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Shenzhen Tech Manufacturing</p>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "buyer" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                        message.sender === "buyer"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "buyer" ? "text-blue-200" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagingPanel;
