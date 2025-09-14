import React, { useState } from 'react'
import style from '../styles/modals/payment.module.css'
import { X } from 'lucide-react'

import { useSpaceContext } from '../context/SpaceContext'

function PaymentModal( { onClose }) {

  const { state, UpgradeWorkspace } = useSpaceContext()
  const { activespace } = state

  const plans = [
    { price_id: "price_1S4R8eGZtkJg6RIykBBdOAgq", name: "Free", price: "0.00", limits: [ "10 members only", "No screen sharing", "30 hours of meeting a month"]},
    { price_id: "price_1S4RHDGZtkJg6RIyZ26LN6ZK", name: "Pro", price: "49.99", limits: [ "30 members only", "Screen sharing", "80 hours of meeting a month" ]},
    { price_id: "price_1S4RHeGZtkJg6RIyH5NgqvpZ", name: "Premium", price: "199.99", limits: [ "1000 members only", "Screen sharing", "Unlimited hours of meeting a month" ] }
  ]


  const [loading, setloading] = useState(false)

  const handleUpgrade = async (price_id) => {
    if(!activespace.Space.id || !price_id){
      alert("No price or workspace id")
      return
    }
    console.log(`Price id ${price_id} and workspace id: ${activespace.Space.id}`)
    setloading(true)
    const result = await UpgradeWorkspace(price_id,activespace.Space.id)
    setloading(false)
    if(result.success){
      onClose()
      window.location.href = result.url
    }
    
  }

  return (
    <div className={style.modalOverlay}>
        <div className={style.paymentModalContainer}>
            <X onClick={onClose} className={style.Icon} />
            <h2>{activespace.Space.name} </h2>
            <div className={style.plans}>
              {
                plans.map((plan)=>(
                  <div className={style.planCard}>
                    <h2> {plan.name}</h2>
                    <h3> ${plan.price}</h3>
                    <h3> Features </h3>
                    {
                      plan.limits.map((limit)=>(
                        <ul>
                          <li>{limit}</li>
                        </ul>
                      ))
                    }
                    <button onClick={()=>handleUpgrade(plan.price_id)} style={ loading ? { "backgroundColor" : "gray", cursor: "not-allowed"} : {}} > { loading ? "Processing" : "Upgrade" } </button>
                  </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default PaymentModal