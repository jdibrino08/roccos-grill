import { MapPin, Phone, Clock, Flame, ExternalLink } from 'lucide-react'
import { BRAND_CONFIG } from '../data/brandConfig'

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#070709] text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <Flame className="h-5 w-5" />
              </div>
              <span className="text-xl font-black font-display text-white tracking-wider">
                ROCCO'S <span className="text-[#d4af37] font-light">GRILL</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Auténtica experiencia restobar en San Diego. Cortes al fuego, paellas marineras al sartén de hierro, alitas BBQ y coctelería de autor con auto-servicio y delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-white/[0.05] hover:bg-[#d4af37]/20 hover:text-[#d4af37] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-white/[0.05] hover:bg-emerald-500/20 hover:text-emerald-400 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#d4af37]" />
              <span>Ubicación San Diego</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {BRAND_CONFIG.address}
            </p>
            <a
              href={BRAND_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#fae8b2] underline underline-offset-4"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Horarios & Modalidades */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#d4af37]" />
              <span>Horarios de Atención</span>
            </h4>
            <p className="text-xs text-stone-300">
              {BRAND_CONFIG.schedule.days}
            </p>
            <p className="text-xs font-mono text-[#d4af37] font-bold">
              {BRAND_CONFIG.schedule.hours}
            </p>
            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <p>• Auto-servicio en Av. Don Julio Centeno</p>
              <p>• Delivery en San Diego y Valencia Norte</p>
            </div>
          </div>

          {/* Formas de Pago */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Pagos Aceptados
            </h4>
            <div className="space-y-1.5 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Pago Móvil (Tasa Oficial BCV)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Dólares en Efectivo (Con cambio)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Zelle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {CURRENT_YEAR} {BRAND_CONFIG.name}. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-stone-400">
            San Diego · Carabobo · Venezuela
          </p>
        </div>
      </div>
    </footer>
  )
}
