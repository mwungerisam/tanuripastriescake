import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, MessageCircle, AlertTriangle } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in TanuRi Pastries App:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      // Clear corrupt cache keys if any
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  private handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f0e0c] text-[#f5f1e8] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#18140f] border border-[#3e3223] rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-['Cinzel',serif] text-[#fbf8f2] mb-2">
              TanuRi Pastries Kigali
            </h1>
            <p className="text-sm text-[#b0a594] mb-6 leading-relaxed">
              We encountered a momentary glitch loading the bakery boutique. Please tap reload or contact our pastry team directly on WhatsApp.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#b38930] via-[#d4af37] to-[#b38930] text-[#120f0a] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Bakery Boutique</span>
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Tanuri Pastries! I want to place an order in Kigali.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-sm hover:bg-[#20bd5a] active:scale-95 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Directly on WhatsApp</span>
              </a>

              <button
                onClick={this.handleResetStorage}
                className="text-xs text-[#8e8473] hover:text-[#d4af37] underline pt-2 block mx-auto transition-colors"
              >
                Reset cached data & restore defaults
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
