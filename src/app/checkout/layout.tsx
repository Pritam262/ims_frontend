import Script from "next/script"

export default function CheckoutPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {children}

        </>
    )
}