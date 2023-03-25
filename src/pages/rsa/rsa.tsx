import { decryptFromPrivateKey, encryptFromPublicKey, getRandomPrivatePublicKey } from '@/utils/encryption'
import { Inter } from '@next/font/google'
import { Button, Divider, RadioChangeEvent } from 'antd'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

const RSA: React.FC = () => {

  // const [rsaGenarateOption, setRsaGenarateOption] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [toEncryptMsg, setToEncryptMsg] = useState("");
  const [myEncryptedMsg, setMyEncryptedMsg] = useState("");

  const [toDecryptMsg, setToDecryptMsg] = useState("");
  const [decryptedMsg, setDecryptedMsg] = useState("");

  const [oppositePublicKey, setOppositePublicKey] = useState('');
  const [history, setHistory] = useState("");


  // const options = [
  //   { label: '随机生成', value: 'Radom' },
  //   { label: '已有私钥', value: 'AlreadyHave' },
  // ];
  // const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
  //   console.log('radio4 checked', value);
  //   setRsaGenarateOption(value);
  // }
  return (
    <div className='flex flex-col  justify-center items-center'>
      <header className='text-center font-bold text-5xl'>秘钥生成 Generate Key Pair</header>
      <Divider />

      {/* <Radio.Group className=''
        options={options}
        onChange={onChange4}
        value={rsaGenarateOption}
        optionType="button"
        buttonStyle="solid"
      /> */}

      {/* 容器，用来替换三种不同的生成模式 */}
      <div className='rsa_gena_container flex flex-col  justify-center items-center'  >

        <div className='flex flex-col md:flex-row justify-evenly  space-y-5 md:space-x-5 md:space-y-0'>
          <div className='privateKey_container'>
            <div>私钥 Private Key</div>
            <textarea name="private_key" id="private_key" rows={10}
              value={privateKey} className=' text-slate-700' />
          </div>
          <div className='publicKey_container'>
            <div>公钥 Public Key</div>
            <textarea name="public_key" id="public_key" rows={10}
              value={publicKey} className=' text-slate-700' />
          </div>

        </div>

        <Button ghost type="primary" onClick={() => {
          console.log('Genarate button clicked')
          getRandomPrivatePublicKey().then(({ publicKeyPem, privateKeyPem }) => {
            setPrivateKey(privateKeyPem)
            setPublicKey(publicKeyPem)
          })
        }}>生成 Generate</Button>

      </div>

      <header className=' font-bold text-5xl text-center mt-10'>加密解密 Encrypt/Decrypt</header>
      <Divider />

      {/* 容器，用来替换三种不同的生成模式 */}
      <div >
        <div className='key_info flex flex-col justify-between'>
          <div className='flex flex-col md:flex-row  justify-center items-center  space-y-5 md:space-x-5 md:space-y-0'>
            <div className='my_private_key_container flex-col'>
              <div>我的私钥 My Private Key</div>
              <textarea name="my_private_key" id="my_private_key" rows={10}
                value={privateKey} className=' text-slate-700'
                onChange={(event) => {
                  setPrivateKey(event.target.value)
                }} />
            </div>
            <div className='other_public_key_container  flex-col'>
              <div>对方公钥 Other·s Public Key</div>
              <textarea name="other_public_key" id="other_public_key" rows={10} placeholder='请填入对方的公钥 Input other`s public key'
                className=' text-slate-700'
                onChange={(event) => {
                  setOppositePublicKey(event.target.value)
                }} />

            </div>
          </div>
        </div>
        <div className=' text-3xl text-center'>加解密操作 Encrypt/Decrypt Ops</div>
        <div className=' flex space-x-2 justify-center'>
          {/* 加密 */}
          <div className=' flex flex-col  space-y-3' >
            <textarea name="to_encrypted_msg" id="to_encrypted_msg" rows={7}
              cols={20} className=' text-slate-700' placeholder='输入你需要加密发给对方的内容 Input the message you want to encrypt before send.'
              onChange={(event) => {
                setToEncryptMsg(event.target.value)
              }} />
            <Button ghost type="primary" onClick={() => {
              console.log('to_encrypted_msg button clicked')
              if (!oppositePublicKey) {
                alert('请输入对方公钥 Input other`s public key')
                return
              }
              if (!toEncryptMsg) {
                alert('请输入待加密内容 Input the content to encrypt')
                return
              }

              setHistory(history + '\n' + toEncryptMsg)
              setMyEncryptedMsg(encryptFromPublicKey(toEncryptMsg, oppositePublicKey))

            }}>加密 Encrypt↓</Button>
            <textarea name="my_encrypted_msg" id="decmy_encrypted_msgypted_msg" rows={7} value={myEncryptedMsg}
              cols={20} className=' text-slate-700' />
          </div>

          {/* 解密 */}
          <div className=' flex flex-col space-y-3'>
            <textarea name="encrypted_msg" id="encrypted_msg" rows={7}
              cols={20} className=' text-slate-700' placeholder='输入对方发来的待解密的内容 Input the encrypted message from others'
              onChange={(event) => {
                setToDecryptMsg(event.target.value)
              }} />
            <Button ghost type="primary" onClick={() => {
              console.log('decrypt button clicked')
              if (!toDecryptMsg) {
                alert('请输入解密内容 Input the encrypted content')
                return
              }
              let decyptedMsg = decryptFromPrivateKey(toDecryptMsg, privateKey)
              setDecryptedMsg(decyptedMsg)
              setHistory(history + '\n' + decyptedMsg)
            }}>解密 Decrypt↓</Button>
            <textarea name="decypted_msg" id="decypted_msg" rows={7} value={decryptedMsg}
              cols={20} className=' text-slate-700' />
          </div>
        </div>
        <div className=' text-3xl text-center'>历史记录 History</div>
        {/* 历史记录 */}
        <div className=' w-96 bg-slate-300 flex-col'>
          <textarea name="history" id="history" cols={30} rows={30} className=' w-full text-gray-900' value={history}></textarea>
        </div>
      </div>
    </div>
  )
}

export default RSA
