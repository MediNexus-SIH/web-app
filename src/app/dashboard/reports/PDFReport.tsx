import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Hindi",
  src: "/assets/Tiro_Devanagari_Hindi/TiroDevanagariHindi-Regular.ttf",
});

// Font.register({
//   family: "Roboto",
//   fonts: [
//     { src: "/assets/Roboto/Roboto-Light.ttf", fontWeight: 300 },
//     { src: "/assets/Roboto/Roboto-Regular.ttf", fontWeight: 400 },
//     { src: "/assets/Roboto/Roboto-Medium.ttf", fontWeight: 500 },
//   ],
// });

const DateContainer = () => {
  return (
    <div className="flex justify-end w-full">
         <Text
      // style={{ fontSize: 10, fontFamily: "Roboto", color: "#6C757D" }}
      style={{ fontSize: 10, color: "#6C757D", justifyContent: "flex-end" }}
    >
      {new Date().toLocaleDateString()}
    </Text>
    </div>
   
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F8F9FA",
    padding: 30,
    // fontFamily: "Roboto, Hindi",
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: "#4A90E2",
    paddingBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    //  fontFamily: "Roboto",
    fontWeight: 500,
    color: "#4A90E2",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Hindi",
    color: "#6C757D",
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    // fontFamily: "Roboto",
    fontWeight: 500,
    marginBottom: 15,
    color: "#4A90E2",
    borderBottom: 1,
    borderBottomColor: "#E9ECEF",
    paddingBottom: 5,
  },
  table: {
    // display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#E9ECEF",
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 30,
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#E9ECEF",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#F1F3F5",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#E9ECEF",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    // fontFamily: "Roboto",
    fontWeight: 500,
    color: "#495057",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    // fontFamily: "Roboto",
    color: "#212529",
  },
  inventoryStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  statusValue: {
    fontSize: 24,
    // fontFamily: "Roboto",
    fontWeight: 500,
    marginBottom: 5,
  },
  statusLabel: {
    fontSize: 12,
    //fontFamily: "Roboto",
    color: "#6C757D",
  },
  note: {
    fontSize: 10,
    //fontFamily: "Roboto",
    color: "#6C757D",
    fontStyle: "italic",
    marginTop: 10,
  },
});

interface PDFReportProps {
  data: {
    inventoryStatus: {
      inStock: number;
      lowStock: number;
      outOfStock: number;
    };
    criticalItems: Array<{ name: string; status: string }>;
  };
}

export default function PDFReport({ data }: PDFReportProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              src="/placeholder.svg?height=50&width=50"
            />
          </View> */}

          <View style={styles.textHeader}>
            <Text style={styles.textHeader}>MediNexus</Text>
            <div className="flex flex-col space-y-4">
              <Text style={(styles.textHeader, { fontFamily: "Hindi" })}>
                औषधि सेतु
              </Text>

            </div>
          </View>
          <DateContainer />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inventory Status</Text>
          <View style={styles.inventoryStatus}>
            <View style={styles.statusItem}>
              <Text style={[styles.statusValue, { color: "#28A745" }]}>
                {data.inventoryStatus.inStock}
              </Text>
              <Text style={styles.statusLabel}>In Stock</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={[styles.statusValue, { color: "#FFC107" }]}>
                {data.inventoryStatus.lowStock}
              </Text>
              <Text style={styles.statusLabel}>Low Stock</Text>
            </View>
            <View style={styles.statusItem}>
              <Text style={[styles.statusValue, { color: "#DC3545" }]}>
                {data.inventoryStatus.outOfStock}
              </Text>
              <Text style={styles.statusLabel}>Out of Stock</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Critical Items</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Item</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Status</Text>
              </View>
            </View>
            {data.criticalItems.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Note</Text>
          <Text style={styles.note}>
            For detailed charts and analytics, please refer to the online
            dashboard. This report was generated automatically and is updated
            daily.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
