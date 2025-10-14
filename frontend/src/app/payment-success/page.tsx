import Navbar from "@/components/navbar/navabar"

export default function PaymentSuccess() {
  return (
    <>
    <Navbar/>
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment.</p>
    </div>
    </>
  );
}