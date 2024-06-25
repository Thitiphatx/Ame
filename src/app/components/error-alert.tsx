interface ErrorAlertProps {
    children: React.ReactNode
}

export default function ErrorAlert({ children }: ErrorAlertProps) {
  return (
    <div>
        {children}
    </div>
  )
}
