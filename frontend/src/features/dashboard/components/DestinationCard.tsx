import { Heart, MessageSquare } from "lucide-react";

type DestinationCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
};

const DestinationCard = ({ imageSrc, imageAlt, title }: DestinationCardProps) => (
  <article className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
    <img
      src={imageSrc}
      alt={imageAlt}
      loading="lazy"
      className="aspect-video w-full object-cover"
    />
    <div className="space-y-3 p-5">
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="flex items-center gap-4 text-muted-foreground">
        <Heart className="size-5" aria-label="Likes" />
        <MessageSquare className="size-5" aria-label="Comments" />
      </div>
    </div>
  </article>
);

export default DestinationCard;
