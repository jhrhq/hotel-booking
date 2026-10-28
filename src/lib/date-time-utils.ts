import { differenceInDays, format, isValid, parseISO } from "date-fns";

export function parseUrlDate(dateInput: string | Date | null | undefined): Date | undefined {
  if (!dateInput) return undefined;
  const parsed = dateInput instanceof Date ? dateInput : parseISO(dateInput);
  return isValid(parsed) ? parsed : undefined;
}

export function formatDisplayDate(dateInput?: string | Date | null, pattern = "MMM d, yyyy"): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  return isValid(date) ? format(date, pattern) : "";
}

export function formatDateISO(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function calculateNights(startDate?: Date, endDate?: Date): number {
  if (!startDate || !endDate) return 0;
  return Math.max(0, differenceInDays(endDate, startDate));
}

export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function formatStayDuration(startDate?: Date, endDate?: Date): string {
  if (!startDate || !endDate) return "Select dates";

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startFormatted = formatter.format(startDate);
  const endFormatted = formatter.format(endDate);

  // Manually join them with a consistent separator string
  return `${startFormatted} – ${endFormatted}`;
}
