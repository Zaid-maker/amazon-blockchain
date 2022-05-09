/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { amazonAbi, amazonCoinAddress } from '../lib/constants'
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

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: assetsDataIsLoading,
  } = useMoralisQuery('assets')

  useEffect(() => {
    ;(async () => {
      if (!isAuthenticated) {
        await getBalance()
        const currentUsername = await user?.get('nickname')
        setUsername(currentUsername)
        const account = await user?.get('ethAddress')
        setCurrentAccount(account)
      }
    })()
  }, [isAuthenticated, user, username, currentAccount])

  useEffect(() => {
    ;(async () => {
      if (isWeb3Enabled) {
        await getAssets()
      }
    })()
  }, [isWeb3Enabled, assetsData, assetsDataIsLoading])

  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set('nickname', nickname)
        user.save()
        setNickname('')
      } else {
        alert('Please enter a nickname, cannot be empty')
      }
    } else {
      console.log('No user')
    }
  }

  const getBalance = async () => {
    try {
      if (!isAuthenticated || !currentAccount) return

      const options = {
        contractAddress: amazonCoinAddress,
        function: 'balanceOf',
        abi: amazonAbi,
        params: {
          account: currentAccount,
        },
      }

      if (isWeb3Enabled) {
        const response = await Moralis.executeFunction(options)
        console.log(response.toString())
        setBalance(response.toString())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const buyTokens = async () => {
    if (!isAuthenticated) {
      authenticate()
    }

    const amount = ethers.BigNumber.from(tokenAmount)
    const price = ethers.BigNumber.from('100000000000000')
    const calcPrice = amount.mul(price)

    console.log(amazonCoinAddress)

    let options = {
      contractAddress: amazonCoinAddress,
      functionName: 'mint',
      abi: amazonAbi,
      msgValue: calcPrice,
      params: {
        amount,
      },
    }

    const transaction = await Moralis.executeFunction(options)
    const receipt = await transaction.wait()
    setIsLoading(false)
    console.log(receipt)
    setEtherscanLink(
      `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
    )
  }

  const getAssets = async () => {
    try {
      await enableWeb3()

      setAssets(assetsData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AmazonContext.Provider
      value={{
        isAuthenticated,
        nickname,
        setNickname,
        username,
        handleSetUsername,
        assets,
        balance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        isLoading,
        setIsLoading,
        etherscanLink,
        setEtherscanLink,
        currentAccount,
        buyTokens,
      }}
    >
      {children}
    </AmazonContext.Provider>
  )
}
