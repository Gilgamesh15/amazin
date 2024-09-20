"use client";
import React, { useEffect, useRef, useState } from "react";
import { getCategories } from "@/lib/actions";
import { Prisma } from "@prisma/client";
import * as d3 from "d3";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CategoryData = {
  name: string;
  children?: CategoryData[];
};

type GetCategoriesReturnType = Prisma.PromiseReturnType<typeof getCategories>;

function transformCategoryData(
  categories: GetCategoriesReturnType
): CategoryData[] {
  function transform(
    category: GetCategoriesReturnType[0],
    parentName: string = ""
  ): CategoryData {
    const fullName = parentName
      ? `${parentName}.${category.name}`
      : category.name;
    return {
      name: fullName,
      children: category.subcategories?.map((sub) => transform(sub, fullName)),
    };
  }
  return categories.map((cat) => transform(cat));
}

// Custom node component with improved error handling
// eslint-disable-next-line react/display-name
const Node = React.memo(
  ({ data }: { data: d3.HierarchyPointNode<CategoryData> }) => {
    const name = data.data?.name?.split(".").pop() || "Root";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "rounded-full text-primary-foreground bg-primary aspect-square p-2 transition-all hover:scale-125 hover:shadow-xl ease-in-out active:scale-90 active:bg-muted-foreground"
          )}
        >
          {name}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Modify</DropdownMenuItem>
          <DropdownMenuItem>Remove</DropdownMenuItem>
          <DropdownMenuItem>Add subcategories</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default function CategoriesDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<d3.HierarchyPointNode<CategoryData>[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const data = await getCategories();
        const transformedData = transformCategoryData(data);
        if (svgRef.current) {
          const width = 928;
          const height = 1800;
          const marginRight = 200;
          const marginLeft = 40;

          const root = d3
            .hierarchy({ children: transformedData } as CategoryData)
            .sort((a, b) => d3.ascending(a.data.name, b.data.name));

          const treeLayout = d3
            .tree<CategoryData>()
            .size([height, width - marginRight - marginLeft]);

          const nodes = treeLayout(root);

          const svg = d3.select(svgRef.current);
          svg.selectAll("*").remove(); // Clear previous content

          const g = svg
            .append("g")
            .attr("transform", `translate(${marginLeft},0)`);

          g.selectAll(".link")
            .data(nodes.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#93c5fd")
            .attr("stroke-width", 2)
            .attr(
              "d",
              d3
                .linkHorizontal<any, any>()
                .x((d) => d.y)
                .y((d) => d.x)
            );

          setNodes(nodes.descendants());
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <Loader2 className="m-8 mr-2 size-24 animate-spin" />;
  }

  return (
    <div className="relative w-[1800px] h-[1900px]">
      <svg ref={svgRef} width="100%" height="1800" />
      {nodes.map((node, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${node.y + 4 * 16}px`,
            top: `${node.x}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Node data={node} />
        </div>
      ))}
    </div>
  );
}
