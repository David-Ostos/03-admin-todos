import {WidgetItem} from "@/components";

const items = [
  {
    title: "Global Activities",
    price: "23,988",
    Percentage: "2",
    compare: "13,988",
  },
  {
    title: "Global Activities",
    price: "23,988",
    Percentage: "2",
    compare: "13,988",
  },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <WidgetItem key={item.title} {...item} />
      ))}
    </div>
  );
}
