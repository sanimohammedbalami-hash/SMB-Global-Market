// src/components/customer/VendorCard.jsx
//
// NOTE: the blueprint mockup shows star ratings (e.g. "4.8 (230)") on vendor
// cards. Your schema doesn't have a reviews/ratings table yet, so this card
// intentionally does NOT show a fabricated number — it shows a "Verified"
// badge instead, which IS real (vendor.status === 'approved', already
// enforced by admin approval). Once a reviews table exists, drop a
// <Rating value={vendor.avg_rating} count={vendor.review_count} /> in below.
import { Link } from 'react-router-dom';
import { BadgeCheck, Store } from 'lucide-react';

export default function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} className="card p-4 text-center hover:shadow-md transition">
      <div className="w-14 h-14 rounded-full bg-emerald-50 mx-auto mb-2 flex items-center justify-center overflow-hidden">
        {vendor.logo_url ? (
          <img src={vendor.logo_url} alt={vendor.business_name} className="w-full h-full object-cover" />
        ) : (
          <Store className="w-6 h-6 text-brand-green" />
        )}
      </div>
      <p className="text-sm font-medium text-gray-800 truncate">{vendor.business_name}</p>
      <span className="inline-flex items-center gap-1 text-xs text-brand-green mt-1">
        <BadgeCheck className="w-3.5 h-3.5" /> Verified
      </span>
    </Link>
  );
}
