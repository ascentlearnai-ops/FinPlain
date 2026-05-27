import { AlertCircle, RefreshCw, Search, Clock } from 'lucide-react'

const MESSAGES = {
  rate_limit: { title: 'Rate Limit Reached', body: 'API quota exceeded. Retry in about 60 seconds.', Icon: Clock },
  not_found: { title: 'Ticker Not Found', body: 'No matching symbol. Verify the ticker and try again.', Icon: Search },
  generic: { title: 'Something Went Wrong', body: 'An unexpected error occurred. Check your connection and retry.', Icon: AlertCircle },
}

interface Props { type: 'rate_limit' | 'not_found' | 'generic'; onRetry?: () => void }

export default function ErrorState({ type, onRetry }: Props) {
  const msg = MESSAGES[type]
  return (
    <div className="glass-card p-12 text-center">
      <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-white text-black flex items-center justify-center">
        <msg.Icon size={22} />
      </div>
      <h3 className="font-bold text-lg text-primary mb-2">{msg.title}</h3>
      <p className="text-sm text-secondary max-w-xs mx-auto mb-6">{msg.body}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2">
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  )
}
