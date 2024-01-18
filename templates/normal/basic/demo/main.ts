import "./style.css";

import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";

import { Univer } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";
import { <%= PROJECT_UPPER_NAME %>Plugin } from '../src'

const univer = new Univer({
  theme: defaultTheme,
});

// core plugins
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverFormulaEnginePlugin, {
  notExecuteFormula: true,
});
univer.registerPlugin(UniverUIPlugin, {
  container: "app",
  header: true,
  toolbar: true,
  footer: true,
});

// doc plugins
univer.registerPlugin(UniverDocsPlugin, {
  hasScroll: false,
});

// sheet plugins
univer.registerPlugin(UniverSheetsPlugin, {
  notExecuteFormula: true,
});
univer.registerPlugin(UniverSheetsUIPlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);

univer.registerPlugin(<%= PROJECT_UPPER_NAME %>Plugin);

univer.createUniverSheet({});
