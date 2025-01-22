import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';

export default function Messages() {
  const { profile } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = []; // This would be fetched from Supabase

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // This would send the message to Supabase
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Conversation preview would go here */}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations yet
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Messages would go here */}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}