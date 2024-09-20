import { StatCardProps } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/utils";
import { StatCardsData } from "@/constants";

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {StatCardsData.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

function StatCard({ icon, number, label }: StatCardProps) {
  const iconClassName =
    "w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-white p-2 shadow-lg";

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">{getIcon(icon, iconClassName)}</div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
                maximumFractionDigits: 1,
              }).format(number)}
            </p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {label}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
