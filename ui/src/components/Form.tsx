import { useState } from 'react'
import { House } from '../types/house'
import { toBase64 } from '../utils/toBase64'

type Props = {
  house: House
  submitted: (house: House) => void
}

const Form = ({ house, submitted }: Props) => {
  const [houseState, setHouse] = useState({ ...house })

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    submitted(houseState)
  }

  const onFileSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault()

    e.target.files &&
      e.target.files[0] &&
      setHouse({
        ...houseState,
        photo: await toBase64(e.target.files[0]),
      })
  }

  return (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={houseState.address}
          onChange={(e) => setHouse({ ...houseState, address: e.target.value })}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          placeholder="Country"
          value={houseState.country}
          onChange={(e) => setHouse({ ...houseState, country: e.target.value })}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          placeholder="Description"
          value={houseState.description}
          onChange={(e) =>
            setHouse({ ...houseState, description: e.target.value })
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={houseState.price}
          onChange={(e) =>
            setHouse({ ...houseState, price: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          className="form-control"
          onChange={onFileSelected}
        />
      </div>
      <div className="mt-2">
        <img src={houseState.photo}></img>
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!houseState.address || !houseState.country}
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  )
}

export default Form
