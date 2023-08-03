import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Image,
  Text,
} from "@react-pdf/renderer";

const styles = {
  page: {
    backgroundColor: "white",
    padding: "1cm",
  },
  document: {
    padding: "2cm",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    flexDirection: "column",
    marginBottom: "1cm",
    alignItems: "center",
  },
  centerImage: {
    display: "flex",

    alignItems: "center",
    marginBottom: "1cm",
  },
  image: {
    width: "100%",
    height: "auto",
  },
};

const MyDocument = ({ res }) => {
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.page} size="A4">
          <View style={styles.document}>
            <Text style={styles.heading}>Diabetic Retinopathy Report</Text>
            {res.map((f, index) => (
              <View key={index} style={styles.centerImage}>
                <Text>
                  {index + 1}. Result[{f.name}]: {f.res}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;
