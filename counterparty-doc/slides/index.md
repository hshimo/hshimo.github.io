
# Counterparty Protocol


* Counterparty Tech Online Meetup
* 2014/01/17 21:00-
* YouTube:
 * https://www.youtube.com/watch?v=5yP7pvQynb4

---

## About Me

* Hiroshi Shimo
 * http://twitter.com/hiroshi_shimo

* Cryptocurrency Tech Japan
 * http://crypto-tech.jp/

* GetGems Japan
 * http://getgems.jp/

---

## Agenda

* What is Counteparty?
* Transaction
* Three Types of Encoding
* How Data Is Stored?
* Encoding (Multi-sig)


---

## What is Counterparty?

* Uses Bitcoin blockchain
* Data is stored in Bitcoin transactions
* Counterpartyd is written by Python

---

## Transaction

What's in it?

* Source addresses
* Destination addresses (optional)
* A quantity of bitcoins sent from the sources to the destinations, if it exists.
* A fee, in bitcoins, paid to the Bitcoin miners who include the transaction in a block.
* Some ‘data’, imbedded in specially constructed transaction outputs

Quote: http://counterparty.io/docs/protocol/

---

## Three Types of Encoding

1. Multi-sig (default)
2. OP_RETURN (40 byte limit)
3. Public Key Hash (not recommended)

---

## How data is stored?

* Encode: UTF-8
* Prefix: CNTRPRTY
* Three types of outputs
* Data is encrypted by ARC4
* 1-of-3 multi-sig
* First 2 out of 3 are fake public keys (data)
* 1 out of 3 is source public key
* Padding by 0

---

## Encoding (Multi-sig)

* Encrypt data using txid by ARC4

```python
key = ARC4.new(binascii.unhexlify(inputs[0]['txid']))  # Arbitrary, easy‐to‐find, unique key.

if encoding == 'multisig':
# Get data (fake) public key.
if util.enabled('multisig_addresses', block_index):   # Protocol change.
pad_length = (33 * 2) - 1 - 2 - 2 - len(data_chunk)
assert pad_length >= 0
data_chunk = bytes([len(data_chunk)]) + data_chunk + (pad_length * b'\x00')
data_chunk = key.encrypt(data_chunk)
data_pubkey_1 = make_fully_valid(data_chunk[:31])
data_pubkey_2 = make_fully_valid(data_chunk[31:])
```

https://github.com/CounterpartyXCP/counterpartyd/blob/master/lib/transaction.py#L210

---

## Construct script (Multi-sig)


```python
tx_script = OP_1                                   # OP_1
tx_script += op_push(33)                           # Push bytes of data chunk (fake) public key    (1/2)
tx_script += data_pubkey_1                         # (Fake) public key                  (1/2)
tx_script += op_push(33)                           # Push bytes of data chunk (fake) public key    (2/2)
tx_script += data_pubkey_2                         # (Fake) public key                  (2/2)
tx_script += op_push(len(dust_return_pubkey))  # Push bytes of source public key
tx_script += dust_return_pubkey                       # Source public key
tx_script += OP_3                                  # OP_3
tx_script += OP_CHECKMULTISIG                      # OP_CHECKMULTISIG
```

https://github.com/CounterpartyXCP/counterpartyd/blob/master/lib/transaction.py#L222

---

## Tools

* Data Decoder
 * [https://github.com/pinheadmz/Counterparty-Data-Decoder](https://github.com/pinheadmz/Counterparty-Data-Decoder "pinheadmz/Counterparty-Data-Decoder")
* Script for bulk counterparty asset sending
 * [https://github.com/CounterpartyXCP/CommunityWiki/wiki/sendmany](https://github.com/CounterpartyXCP/CommunityWiki/wiki/sendmany:-script-for-bulk-Counterparty-asset-sending "sendmany: script for bulk Counterparty asset sending · CounterpartyXCP/CommunityWiki Wiki")


---

## Special Thanks

* Yusaku Maezono
* Jonathan Underwood
* Counterparty community members
 * https://gitter.im/CounterpartyXCP/Technical

