import React from 'react';
import { sanintAiLogo } from '../../constants';

export const BentoAIChat: React.FC = () => {
    
    const messages = [
        { from: 'user', text: 'What are the main benefits of switching to solar?', avatar: 'https://i.pravatar.cc/40?u=a' },
        { from: 'ai', text: 'Of course! Switching to solar power offers several key advantages:', avatar: sanintAiLogo },
        { from: 'ai', text: '1. Reduced electricity bills\n2. Lower carbon footprint\n3. Increased property value', avatar: sanintAiLogo },
        { from: 'user', text: 'How long does installation take?', avatar: 'https://i.pravatar.cc/40?u=a' },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-gray-900/50 text-sm font-sans">
            <div className="flex-grow space-y-3 overflow-y-auto p-3 pr-1">
                {messages.map((msg, index) => {
                    const isUser = msg.from === 'user';
                    return (
                        <div key={index} className={`flex items-start gap-2 ${isUser ? 'justify-end' : ''}`}>
                            {!isUser && <img src={msg.avatar} className="w-6 h-6 rounded-full" />}
                            <div className={`max-w-[75%] rounded-lg p-2 ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-300 rounded-bl-none'}`}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                            {isUser && <img src={msg.avatar} className="w-6 h-6 rounded-full" />}
                        </div>
                    );
                })}
            </div>
            <div className="mt-3 flex-shrink-0 p-3 pt-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask anything..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-1.5 pl-3 pr-8 text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3.47826 2.40462L22.5298 11.4561C22.7101 11.5463 22.8468 11.7139 22.9069 11.912C22.967 12.1101 22.9463 12.3253 22.8497 12.5082L20.2433 17.3361L14.9355 14.9272L18.8997 7.10039L6.07289 13.0645L3.46651 20.9169C3.37631 21.1623 3.16143 21.3489 2.90283 21.4239C2.64424 21.4988 2.37036 21.4526 2.15222 21.2995L1.04306 20.4496C0.844335 20.3094 0.710714 20.0913 0.679198 19.8559C0.647683 19.6206 0.721998 19.3853 0.880819 19.2125L3.47826 2.40462Z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};