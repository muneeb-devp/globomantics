import { useState } from 'react'
import { useAddBid, useFetchBids } from '../hooks/BidHooks'
import { Bid } from '../types/bid'
import { House } from '../types/house'
import ApiStatus from './ApiStatus'

type Props = {
  house: House
}

const Bids = ({ house }: Props) => {
  const { data, status, isSuccess } = useFetchBids(house.id)
  const addBidMutation = useAddBid()

  const emptyBid: Bid = {
    id: 0,
    houseId: house.id,
    amount: 0,
    bidder: '',
  }
  const [bid, setBid] = useState<Bid>(emptyBid)

  if (!isSuccess) return <ApiStatus status={status} />

  const onBidSubmitClick = () => {
    addBidMutation.mutate(bid)
    setBid(emptyBid)
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((b) => (
                  <tr key={b.id}>
                    <td>{b.bidder}</td>
                    <td>{b.amount.toLocaleString('en-us')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <input
            id="bidder"
            className="h-100"
            type="text"
            value={bid.bidder}
            onChange={(e) => setBid({ ...bid, bidder: e.target.value })}
            placeholder="Bidder"
          ></input>
        </div>
        <div className="col-4">
          <input
            id="amount"
            className="h-100"
            type="number"
            value={bid.amount}
            onChange={(e) =>
              setBid({ ...bid, amount: parseInt(e.target.value) })
            }
            placeholder="Amount"
          ></input>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={() => onBidSubmitClick()}
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default Bids
