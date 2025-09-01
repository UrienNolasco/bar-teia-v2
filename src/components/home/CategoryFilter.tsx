"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCategory } from "@prisma/client";

interface Category {
  value: string | ProductCategory;
  label: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    string | ProductCategory | null
  >(null);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.value}
          onClick={() => {
            if (selectedCategory === category.value) {
              setSelectedCategory(null);
            } else {
              setSelectedCategory(category.value);
            }
          }}
          variant={selectedCategory === category.value ? "default" : "outline"}
          className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category.value
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span className="font-medium">{category.label}</span>
        </Button>
      ))}
    </div>
  );
}
