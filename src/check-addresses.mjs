import { BIP32Factory } from 'bip32';
import bip39 from 'bip39'
import * as ecc from 'tiny-secp256k1';
import { payments } from 'bitcoinjs-lib'

const bip32 = BIP32Factory(ecc);

const mnemonic = 'abort abort abort abort abort abort abort abort abort abort abort abort'
const seed = bip39.mnemonicToSeedSync(mnemonic)

const root = bip32.fromSeed(seed)
// const root = bip32.fromBase58('xprv9s21ZrQH14...');

const purpose = "84'"
const coin = "0'"
const account = "0'"
const chain = "0" // 0 - external, 1 - change

const payment = {
    "44'": payments.p2pkh,
    "84'": payments.p2wpkh,
    // "86'": payments.p2tr
}

const accountKey = root.derivePath(`m/${purpose}/${coin}/${account}`)
console.log(`### bip${purpose} acount xpub`, accountKey.neutered().toBase58())
for (let i = 0; i < 10; i++) {
    const path = `${chain}/${i}`
    const child = accountKey.derivePath(path);

    const p = payment[purpose]({ pubkey: child.publicKey })
    console.log(`${p.address}, ${path}`)
}
