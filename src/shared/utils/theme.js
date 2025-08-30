import { theme } from "antd";

const commonColors = {
  primaryMain: "#00A5CF",
  primaryDark: "#00315C",
  primaryDeep: "#00172F",
  secondaryMain: "#068C6B",
  secondaryLight: "#9FFFCB",
  secondaryDark: "#62DD6A",
};

export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Core brand colors
    colorPrimary: commonColors.primaryMain,

    colorBgLayout: "#F5F5F5",

    colorText: commonColors.primaryDeep,
    colorTextSecondary: "#64748B",

    colorSuccess: commonColors.secondaryDark,

    colorBorder: "#E2E8F0",

    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    borderRadius: 8,
  },
  components: {
    Card: {
      bodyPadding: 16,
    },
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: commonColors.primaryMain,
      itemSelectedColor: "#ffffff",
    },
    Tooltip: {
      colorBgSpotlight: commonColors.primaryMain,
    },
  },
};

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Core brand colors (same as light)
    colorPrimary: commonColors.primaryMain,

    colorBgLayout: "#0F172A",
    colorBgContainer: "#1E293B",
    colorBgElevated: "#334155",

    colorText: "#F1F5F9",
    colorTextSecondary: "#94A3B8",

    colorSuccess: commonColors.secondaryDark,

    colorError: "#ef5350",

    colorBorder: "#475569",
    colorBorderSecondary: "#404a59ff", // For secondary borders
    colorSplit: "#475569", // For dividers

    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    borderRadius: 8,
  },
  components: {
    Card: {
      bodyPadding: 16,
    },
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: commonColors.primaryMain,
      itemSelectedColor: "#ffffff",
    },
    Tooltip: {
      colorBgSpotlight: commonColors.primaryMain,
    },
    Modal: {
      contentBg: "#243447",
      headerBg: "#243447",
    },
  },
};
