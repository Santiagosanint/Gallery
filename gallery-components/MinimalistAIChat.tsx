
import React from 'react';

export const MinimalistAIChat: React.FC = () => {
    const messages = [
        { from: 'user', text: 'Can you summarize the book "Sapiens" for me?' },
        { from: 'ai', text: 'Certainly. "Sapiens: A Brief History of Humankind" by Yuval Noah Harari traces the history of Homo sapiens from the Stone Age to the present, focusing on three major revolutions: the Cognitive, the Agricultural, and the Scientific.' },
        { from: 'user', text: 'What is the main argument?' },
        { from: 'ai', text: 'The book\'s central thesis is that our ability to cooperate flexibly in large numbers, based on shared myths and fictions like money, religion, and nations, is what has allowed us to dominate the planet.' },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-white font-sans">
            <div className="flex-grow space-y-4 overflow-y-auto p-4 pr-2">
                {messages.map((msg, index) => {
                    const isUser = msg.from === 'user';
                    return (
                        <div key={index} className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
                            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${isUser ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex-shrink-0 p-4 pt-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter your prompt"
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-900 focus:ring-1 focus:ring-gray-800 focus:outline-none"
                    />
                     <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.94625 9.31546L13.4381 3.51139C13.5932 3.44855 13.7661 3.44751 13.9221 3.50854C14.078 3.56957 14.1951 3.68665 14.258 3.84171L20.052 15.3336C20.115 15.4886 20.116 15.6615 20.055 15.8175C19.994 15.9735 19.8769 16.0905 19.7218 16.1534L8.22997 21.9575C8.07489 22.0203 7.90201 22.0213 7.74603 21.9603C7.59005 21.8993 7.47299 21.7822 7.40999 21.6271L1.61611 10.1352C1.55312 9.9802 1.55208 9.80731 1.61311 9.65134C1.67414 9.49536 1.7912 9.37828 1.94625 9.31546ZM3.85375 10.3345L8.58389 19.8654L18.0441 15.1353L13.3139 5.60435L3.85375 10.3345Z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};