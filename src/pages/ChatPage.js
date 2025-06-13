"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FaArrowLeft,
  FaPaperPlane,
  FaPhone,
  FaVideo,
  FaImage,
  FaSmile,
  FaCheck,
  FaCheckDouble,
  FaCommentDots,
} from "react-icons/fa"
import { useApp } from "../context/AppContext"

function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: "dealer",
        senderName: "PrimeDrive Motors",
        message:
          "Hello! I see you're interested in the 2022 Toyota Corolla. I'd be happy to answer any questions you have!",
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: 2,
        senderId: "user",
        senderName: "You",
        message: "Hi! Yes, I'm very interested. Can you tell me more about the service history?",
        timestamp: new Date(Date.now() - 3500000),
        read: true,
      },
      {
        id: 3,
        senderId: "dealer",
        senderName: "PrimeDrive Motors",
        message:
          "This vehicle has a complete service history with 8 recorded services. The last service was done in January 2024. All services were performed at authorized Toyota service centers.",
        timestamp: new Date(Date.now() - 3400000),
        read: true,
      },
      {
        id: 4,
        senderId: "user",
        senderName: "You",
        message: "That sounds great! Is it possible to schedule a test drive?",
        timestamp: new Date(Date.now() - 3300000),
        read: true,
      },
      {
        id: 5,
        senderId: "dealer",
        senderName: "PrimeDrive Motors",
        message:
          "Of course! I can arrange a test drive for you. When would be convenient for you? We're open Monday to Saturday, 8 AM to 6 PM.",
        timestamp: new Date(Date.now() - 3200000),
        read: false,
      },
    ],
    2: [
      {
        id: 1,
        senderId: "dealer",
        senderName: "AutoMax Dealers",
        message: "Thank you for your interest in the Volkswagen Polo! How can I assist you today?",
        timestamp: new Date(Date.now() - 7200000),
        read: true,
      },
    ],
  })

  const messagesEndRef = useRef(null)
  const { state, dispatch } = useApp()

  const dealers = [
    {
      id: 1,
      name: "PrimeDrive Motors",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Of course! I can arrange a test drive for you...",
      timestamp: new Date(Date.now() - 3200000),
      unread: 1,
      online: true,
      carTitle: "2022 Toyota Corolla",
    },
    {
      id: 2,
      name: "AutoMax Dealers",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Thank you for your interest in the Volkswagen Polo!",
      timestamp: new Date(Date.now() - 7200000),
      unread: 0,
      online: false,
      carTitle: "2021 Volkswagen Polo",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedChat])

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return

    const newMessage = {
      id: Date.now(),
      senderId: "user",
      senderName: "You",
      message: message.trim(),
      timestamp: new Date(),
      read: true,
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }))

    setMessage("")

    // Simulate dealer response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! I'll get back to you shortly.",
        "Let me check that information for you.",
        "I'll arrange that for you right away.",
        "That's a great question! Let me provide you with the details.",
      ]

      const dealerResponse = {
        id: Date.now() + 1,
        senderId: "dealer",
        senderName: dealers.find((d) => d.id === selectedChat)?.name || "Dealer",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        read: false,
      }

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), dealerResponse],
      }))
    }, 2000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  if (!selectedChat) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-orange-500 text-white p-4 flex items-center">
          <Link to="/home">
            <button className="mr-3 text-white hover:bg-white/10 p-2 rounded-full">
              <FaArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <h1 className="font-bold text-xl">Messages</h1>
        </header>

        {/* Chat List */}
        <div className="flex-1">
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              onClick={() => setSelectedChat(dealer.id)}
              className="bg-white border-b border-gray-100 p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={dealer.avatar || "/placeholder.svg"}
                    alt={dealer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {dealer.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{dealer.name}</h3>
                      <p className="text-sm text-gray-600">{dealer.carTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatTime(dealer.timestamp)}</p>
                      {dealer.unread > 0 && (
                        <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1 ml-auto">
                          {dealer.unread}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 truncate">{dealer.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}

          {dealers.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FaCommentDots className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-500 mb-4">Start chatting with dealers about cars you're interested in</p>
                <Link to="/home">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Browse Cars
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const currentDealer = dealers.find((d) => d.id === selectedChat)
  const chatMessages = messages[selectedChat] || []

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSelectedChat(null)}
            className="mr-3 text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <div className="relative">
            <img
              src={currentDealer?.avatar || "/placeholder.svg"}
              alt={currentDealer?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {currentDealer?.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="ml-3">
            <h2 className="font-medium">{currentDealer?.name}</h2>
            <p className="text-sm text-gray-500">{currentDealer?.online ? "Online" : "Last seen recently"}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full">
            <FaPhone className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full">
            <FaVideo className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, index) => {
          const isUser = msg.senderId === "user"
          const showDate = index === 0 || formatDate(msg.timestamp) !== formatDate(chatMessages[index - 1].timestamp)

          return (
            <div key={msg.id}>
              {showDate && <div className="text-center text-xs text-gray-500 my-4">{formatDate(msg.timestamp)}</div>}
              <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isUser ? "bg-orange-500 text-white" : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <div
                    className={`flex items-center justify-end mt-1 space-x-1 ${
                      isUser ? "text-orange-100" : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs">{formatTime(msg.timestamp)}</span>
                    {isUser && (msg.read ? <FaCheckDouble className="h-3 w-3" /> : <FaCheck className="h-3 w-3" />)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <FaImage className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700">
              <FaSmile className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaPaperPlane className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
