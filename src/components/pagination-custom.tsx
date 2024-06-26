import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationCustomProps {
  page: number;
  totalPages: number;
  prevPage: (param: number) => void;
  changePage: (param: number) => void;
  nextPage: (param: number) => void;
}

export function PaginationCustom({
  page,
  totalPages,
  prevPage,
  changePage,
  nextPage,
}: PaginationCustomProps) {
  const [active, setActive] = React.useState<number>(page);

  const getItemProps = (index: number) => ({
    variant: active === index ? "filled" : "text",
    color: "red",
    onClick: () => {
      setActive(index);
      changePage(index);
    },
  });

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
    nextPage(active);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    prevPage(active);
  };

  const renderPages = () => {
    const pages = [];
    const showPages = 5;
    const sidePages = 2;
    const startPage = Math.max(2, active - sidePages);
    const endPage = Math.min(totalPages - 1, active + sidePages);

    // Always show the first page
    pages.push(
      //@ts-ignore

      <IconButton key={1} {...getItemProps(1)}>
        1
      </IconButton>
    );

    // Show ellipsis if startPage is greater than 2
    if (startPage > 2) {
      pages.push(
        <span key="start-ellipsis" className="px-2 py-1">
          ...
        </span>
      );
    }

    // Show the range of pages around the active page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        //@ts-ignore

        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }

    // Show ellipsis if endPage is less than totalPages - 1
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="end-ellipsis" className="px-2 py-1">
          ...
        </span>
      );
    }

    // Always show the last page
    if (totalPages > 1) {
      pages.push(
        //@ts-ignore
        <IconButton
          placeholder={""}
          key={totalPages}
          {...getItemProps(totalPages)}
        >
          {totalPages}
        </IconButton>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-4 mt-4">
      <Button
        placeholder={""}
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        color="red"
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Précédent
      </Button>
      <div className="flex items-center gap-2">{renderPages()}</div>
      <Button
        placeholder={""}
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        color="red"
        disabled={active === totalPages}
      >
        Suivant
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
