import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
//import { amazonAbi, amazonCoinAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const AmazonContext = createContext()

export const AmazonProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formattedAccount, setFormattedAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [amountDue, setAmountDue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [etherscanLink, setEtherscanLink] = useState('')
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [assets, setAssets] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [ownedItems, setOwnedItems] = useState([])

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis()

  useEffect(() => {
    ;(async () => {
      if (!isAuthenticated) {
        const currentUsername = await user?.get('nickname')
        setUsername(currentUsername)
      }
    })()
  }, [isAuthenticated, user, username])

  const handlesetUsername = () => {
    if (user) {
      if (nickname) {
        user.set('nickname', nickname)
        user.save()
        setNickname('')
      } else {
        alert('Please enter a username, cannot be empty')
      }
    } else {
      console.log('no user')
    }
  }

  return (
    <AmazonContext.Provider
      value={{
        isAuthenticated,
        nickname,
        setNickname,
        username,
        handlesetUsername,
      }}
    >
      {children}
    </AmazonContext.Provider>
  )
}
