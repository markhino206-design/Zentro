export function RatingStars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="text-amber-500" aria-label={`Rating ${rating}`}>
      {'★'.repeat(full)}
      <span className="text-slate-300">{'★'.repeat(5 - full)}</span>
      <span className="ml-2 text-xs text-slate-500">{rating.toFixed(1)}</span>
    </div>
  );
}
