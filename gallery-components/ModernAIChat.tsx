import React from 'react';
import { sanintAiLogo } from '../../constants';

export const ModernAIChat: React.FC = () => {
    const messages = [
        { from: 'user', text: 'Hey there! Can you help me design a logo?', avatar: 'https://i.pravatar.cc/40?u=b' },
        { from: 'ai', text: 'Absolutely! What industry is the logo for?' },
        { from: 'user', text: 'It\'s for a new tech startup focused on sustainable energy.', avatar: 'https://i.pravatar.cc/40?u=b' },
        { from: 'ai', text: 'Great! How about a leaf integrated with a circuit board pattern?' },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-gray-900 font-sans">
            <div className="flex-grow space-y-4 overflow-y-auto p-4 pr-2">
                {messages.map((msg, index) => {
                    const isUser = msg.from === 'user';
                    return (
                        <div key={index} className={`flex items-end gap-2 ${isUser ? 'justify-end' : ''}`}>
                            {!isUser && <img src={sanintAiLogo} className="w-8 h-8 rounded-full" />}
                            <div className={`max-w-[80%] rounded-2xl p-3 ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-300 rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                            </div>
                            {isUser && <img src={msg.avatar} className="w-8 h-8 rounded-full" />}
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex-shrink-0 p-4 pt-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 pl-4 pr-12 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};