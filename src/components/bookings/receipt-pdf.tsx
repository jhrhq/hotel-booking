import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { UserBookingDTO } from "@/db/models/mappers/booking.mappers";
import { CompanyLogo } from "./company-logo";

export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

const PRIMARY_COLOR = "#009688";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  topAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: PRIMARY_COLOR,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 40,
  },
  logo: {
    width: 140,
    objectFit: "contain",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  receiptTitle: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  receiptId: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  column: {
    width: "45%",
  },
  label: {
    fontSize: 10,
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  valueTitle: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 2,
  },
  valueSub: {
    fontSize: 10,
    color: "#4b5563",
  },
  statusBadge: {
    backgroundColor: "#e0f2f1",
    color: PRIMARY_COLOR,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    alignSelf: "flex-start",
    marginTop: 8,
  },
  table: {
    width: "100%",
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR,
    paddingBottom: 8,
    marginBottom: 12,
  },
  tableHeaderCol1: { width: "40%", fontSize: 10, color: PRIMARY_COLOR, fontWeight: "bold", textTransform: "uppercase" },
  tableHeaderCol2: {
    width: "30%",
    fontSize: 10,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  tableHeaderCol3: {
    width: "30%",
    fontSize: 10,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  col1: { width: "40%", fontSize: 11, color: "#374151" },
  col2: { width: "30%", fontSize: 11, color: "#374151", textAlign: "center" },
  col3: { width: "30%", fontSize: 11, color: "#374151", textAlign: "right" },
  summaryBox: {
    width: "50%",
    alignSelf: "flex-end",
    marginTop: 20,
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { fontSize: 11, color: "#6b7280" },
  summaryValue: { fontSize: 11, color: "#111827", fontWeight: "bold" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  totalLabel: { fontSize: 14, color: "#111827", fontWeight: "bold" },
  totalValue: { fontSize: 16, color: PRIMARY_COLOR, fontWeight: "bold" },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
  },
  footerText: {
    fontSize: 9,
    color: "#9ca3af",
  },
});

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export function ReceiptPDF({ booking }: { booking: UserBookingDTO }) {
  const { property, priceSummary, checkin, checkout, guests, id, status } = booking;
  const nights = Math.ceil((checkout.getTime() - checkin.getTime()) / (1000 * 3600 * 24));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topAccentBar} />

        <View style={styles.header}>
          <CompanyLogo width={140} height={46} />{" "}
          <View style={styles.headerRight}>
            <Text style={styles.receiptTitle}>Receipt</Text>
            <Text style={styles.receiptId}>Booking #{id.slice(0, 8).toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.column}>
            <Text style={styles.label}>Billed To / Property</Text>
            <Text style={styles.valueTitle}>{property.title}</Text>
            <Text style={styles.valueSub}>{property.location.address}</Text>
            <Text style={styles.statusBadge}>{status}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Stay Schedule</Text>
            <Text style={styles.valueTitle}>
              {formatDate(checkin)} - {formatDate(checkout)}
            </Text>
            <Text style={styles.valueSub}>
              {nights} Night{nights !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCol1}>Description</Text>
            <Text style={styles.tableHeaderCol2}>Guests</Text>
            <Text style={styles.tableHeaderCol3}>Amount</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.col1}>Accommodation Charge</Text>
            <Text style={styles.col2}>{guests}</Text>
            <Text style={styles.col3}>{formatCurrency(priceSummary.totalCost, priceSummary.currency)}</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(priceSummary.totalCost, priceSummary.currency)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>{formatCurrency(priceSummary.totalCost, priceSummary.currency)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for your reservation. If you have any questions, please contact our support team.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
