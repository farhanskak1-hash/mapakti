import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Instagram, Youtube, Facebook } from '../common/SocialIcons';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection = () => {
  const { settings, addToast } = useData();
  const [msgForm, setMsgForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [msgSent, setMsgSent] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMsgSent(true);
    addToast({
      type: 'success',
      title: 'Pesan Terkirim',
      message: 'Terima kasih atas pesan Anda. Pengurus sekretariat akan segera merespons.'
    });
    setMsgForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setMsgSent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" /> Hubungi Kami
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Kontak & Sekretariat MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Kunjungi sekretariat kami di Kampus 1 Universitas Pancasakti Tegal atau hubungi melalui kanal komunikasi resmi organisasi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-xl font-black text-white border-b border-slate-800 pb-4">
              Informasi Sekretariat
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5">Alamat Kampus:</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{settings.secretariatAddress}</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5">Hotline / WhatsApp:</div>
                  <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-[#F5C400] hover:underline font-mono text-xs">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5">Surat Elektronik:</div>
                  <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-[#F5C400] font-mono text-xs">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white mb-0.5">Jam Piket Sekretariat:</div>
                  <div className="text-slate-400 text-xs">{settings.operationalHours}</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Media Sosial Resmi</h4>
              <div className="flex items-center gap-2.5">
                <a
                  href={settings.socialMedia?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-[#F5C400] hover:border-[#F5C400]/40 transition-colors flex items-center gap-2 text-xs font-semibold"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href={settings.socialMedia?.youtube || 'https://youtube.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-400/40 transition-colors flex items-center gap-2 text-xs font-semibold"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Preview Container */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-2 overflow-hidden shadow-xl">
            <iframe
              title="Lokasi Kampus UPS Tegal"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.026421443781!2d109.13904531477265!3d-6.887422995023164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb764d08ee717%3A0x6bfe73f5da418e2c!2sUniversitas%20Pancasakti%20Tegal!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
              width="100%"
              height="240"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] text-[#F5C400] text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5" /> Kirim Pesan
            </div>
            <h3 className="text-2xl font-black text-white">Hubungi Pengurus MAPAKTI</h3>
            <p className="text-xs text-slate-400 mt-1">
              Ada pertanyaan terkait keorganisasian, kerjasama ekspedisi, atau bakti lingkungan? Silakan kirimkan pesan kepada kami.
            </p>
          </div>

          {msgSent ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/60 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Pesan Berhasil Terkirim!</h4>
              <p className="text-xs text-slate-300">
                Pesan Anda telah diteruskan ke pengurus sekretariat MAPAKTI. Kami akan segera menghubungi kembali.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    value={msgForm.name}
                    onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                    placeholder="Nama lengkap atau instansi"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={msgForm.email}
                    onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Perihal / Subjek *</label>
                <input
                  type="text"
                  required
                  value={msgForm.subject}
                  onChange={(e) => setMsgForm({ ...msgForm, subject: e.target.value })}
                  placeholder="Contoh: Undangan Kerjasama Ekspedisi / Info Diklatsar"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Isi Pesan *</label>
                <textarea
                  required
                  rows={5}
                  value={msgForm.message}
                  onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                  placeholder="Tuliskan pesan lengkap atau pertanyaan Anda di sini..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan ke Pengurus</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
