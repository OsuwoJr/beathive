import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  isWalletConnected: false,
  
  connectWallet: (walletAddress) => set({ 
    isWalletConnected: true, 
    user: { 
      walletAddress,
      accountId: `0.0.${Math.floor(Math.random() * 1000000)}`,
      name: 'Your Artist Name',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${walletAddress}`
    } 
  }),
  
  disconnectWallet: () => set({ 
    isWalletConnected: false, 
    user: null 
  }),
}))

export default useStore

