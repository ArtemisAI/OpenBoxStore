 import type { NextPage } from 'next'
 import Chatbot from '@/components/Chatbot'; // Assuming Chatbot.tsx is in src/components
 
 // TODO: Implement the homepage for The Open Box marketplace
 const HomePage: NextPage = () => {
   return (
     <div>
       <h1>The Open Box / La Boîte Ouverte</h1>
       <p>Welcome to our marketplace!</p>
       <div>
         <h2>Featured Products</h2>
         <p>TODO: Display featured products here.</p>
       </div>
       <div>
         <h2>Shop Now</h2>
         <p>TODO: Add a button or link to browse all products.</p>
       </div>
       <div className="mt-8">
         <h2 className="text-2xl font-semibold mb-4">Chat with our AI Assistant</h2>
         <Chatbot />
       </div>
     </div>
   )
 }
 
 export default HomePage