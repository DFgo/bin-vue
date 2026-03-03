import { h as ref, w as watch, o as onMounted, b as onUnmounted, cN as createBlock, u as unref, cO as resolveComponent, cP as useRoute, cQ as openBlock, cR as withCtx, B as createVNode, cS as createBaseVNode, X as createTextVNode, cT as toDisplayString, cU as createElementBlock, F as Fragment, cV as renderList, cW as Pie, cX as Column, e as computed, cY as normalizeClass, cZ as createCommentVNode, G as nextTick, bh as LinearGradient, c_ as createRouter, c$ as createWebHashHistory, as as createApp } from "./vue-core.js";
import { t as theme, D as DashboardOutlined, a as DeploymentUnitOutlined, U as UserOutlined, S as SearchOutlined, F as FilterOutlined, b as api, R as ReloadOutlined, c as FullscreenExitOutlined, d as FullscreenOutlined, E as ExportOutlined, H as HddOutlined, I as InfoCircleOutlined, A as Antd } from "./ant-design.js";
import { i as init } from "./echarts.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const _imports_0 = "" + new URL("../svg/logo.svg", import.meta.url).href;
const _hoisted_1$2 = { style: { "display": "flex", "align-items": "center" } };
const _sfc_main$4 = {
  __name: "App",
  setup(__props) {
    const route = useRoute();
    const current = ref(["/"]);
    const currentTime = ref((/* @__PURE__ */ new Date()).toLocaleString("zh-CN"));
    let timer;
    watch(() => route.path, (newPath) => {
      current.value = [newPath];
    });
    onMounted(() => {
      timer = setInterval(() => {
        currentTime.value = (/* @__PURE__ */ new Date()).toLocaleString("zh-CN");
      }, 1e3);
    });
    onUnmounted(() => {
      clearInterval(timer);
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_a_menu_item = resolveComponent("a-menu-item");
      const _component_a_menu = resolveComponent("a-menu");
      const _component_a_typography_text = resolveComponent("a-typography-text");
      const _component_a_button = resolveComponent("a-button");
      const _component_a_space = resolveComponent("a-space");
      const _component_a_layout_header = resolveComponent("a-layout-header");
      const _component_router_view = resolveComponent("router-view");
      const _component_a_layout_content = resolveComponent("a-layout-content");
      const _component_a_layout = resolveComponent("a-layout");
      const _component_a_config_provider = resolveComponent("a-config-provider");
      return openBlock(), createBlock(_component_a_config_provider, {
        theme: {
          algorithm: unref(theme).darkAlgorithm,
          token: { colorPrimary: "#1890ff", colorBgBase: "#001529", borderRadius: 4 }
        }
      }, {
        default: withCtx(() => [
          createVNode(_component_a_layout, { style: { "height": "100vh", "background": "transparent" } }, {
            default: withCtx(() => [
              createVNode(_component_a_layout_header, {
                class: "glass-header",
                style: { "display": "flex", "align-items": "center", "justify-content": "space-between" }
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$2, [
                    _cache[3] || (_cache[3] = createBaseVNode("div", { style: { "color": "#fff", "font-size": "16px", "font-weight": "600", "display": "flex", "align-items": "center", "margin-right": "40px" } }, [
                      createBaseVNode("img", {
                        src: _imports_0,
                        alt: "Logo",
                        style: { "height": "32px", "margin-right": "12px" }
                      }),
                      createBaseVNode("span", { style: { "font-size": "16px", "font-weight": "600" } }, "仓储BIN位看板")
                    ], -1)),
                    createVNode(_component_a_menu, {
                      selectedKeys: current.value,
                      "onUpdate:selectedKeys": _cache[0] || (_cache[0] = ($event) => current.value = $event),
                      theme: "dark",
                      mode: "horizontal",
                      style: { "background": "transparent", "border-bottom": "none", "min-width": "300px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_menu_item, { key: "/" }, {
                          icon: withCtx(() => [
                            createVNode(unref(DashboardOutlined))
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_router_link, { to: "/" }, {
                              default: withCtx(() => [..._cache[1] || (_cache[1] = [
                                createTextVNode("看板视图", -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_a_menu_item, { key: "/statistics" }, {
                          icon: withCtx(() => [
                            createVNode(unref(DeploymentUnitOutlined))
                          ]),
                          default: withCtx(() => [
                            createVNode(_component_router_link, { to: "/statistics" }, {
                              default: withCtx(() => [..._cache[2] || (_cache[2] = [
                                createTextVNode("统计分析", -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["selectedKeys"])
                  ]),
                  createVNode(_component_a_space, { size: "middle" }, {
                    default: withCtx(() => [
                      createVNode(_component_a_typography_text, { style: { "color": "rgba(255,255,255,0.45)", "font-size": "12px" } }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(currentTime.value), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_a_button, {
                        type: "text",
                        size: "small"
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(UserOutlined))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_a_layout_content, { style: { "height": "calc(100vh - 64px)", "overflow": "hidden" } }, {
                default: withCtx(() => [
                  createVNode(_component_router_view)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["theme"]);
    };
  }
};
const _sfc_main$3 = {
  __name: "FilterPanel",
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  emits: ["update:modelValue", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const updateField = (key, value) => {
      emit("update:modelValue", { ...props.modelValue, [key]: value });
    };
    const onAreaChange = (val) => {
      emit("update:modelValue", {
        ...props.modelValue,
        area: val,
        row: "all",
        level: "all"
      });
    };
    const onRowChange = (val) => {
      emit("update:modelValue", {
        ...props.modelValue,
        row: val,
        level: "all"
      });
    };
    return (_ctx, _cache) => {
      const _component_a_space = resolveComponent("a-space");
      const _component_a_input = resolveComponent("a-input");
      const _component_a_form_item = resolveComponent("a-form-item");
      const _component_a_select_option = resolveComponent("a-select-option");
      const _component_a_select = resolveComponent("a-select");
      const _component_a_col = resolveComponent("a-col");
      const _component_a_row = resolveComponent("a-row");
      const _component_a_input_number = resolveComponent("a-input-number");
      const _component_a_button = resolveComponent("a-button");
      const _component_a_form = resolveComponent("a-form");
      const _component_a_card = resolveComponent("a-card");
      return openBlock(), createBlock(_component_a_card, {
        size: "small",
        class: "glass-card"
      }, {
        title: withCtx(() => [
          createVNode(_component_a_space, null, {
            default: withCtx(() => [
              createVNode(unref(FilterOutlined)),
              _cache[8] || (_cache[8] = createTextVNode(" 筛选控制台 ", -1))
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          createVNode(_component_a_form, {
            layout: "vertical",
            size: "small"
          }, {
            default: withCtx(() => [
              createVNode(_component_a_form_item, { style: { "margin-bottom": "8px" } }, {
                default: withCtx(() => [
                  createVNode(_component_a_input, {
                    value: __props.modelValue.id,
                    placeholder: "搜索编号...",
                    "allow-clear": "",
                    "onUpdate:value": _cache[0] || (_cache[0] = (val) => updateField("id", val))
                  }, {
                    prefix: withCtx(() => [
                      createVNode(unref(SearchOutlined))
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_a_row, { gutter: 8 }, {
                default: withCtx(() => [
                  createVNode(_component_a_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_a_form_item, {
                        label: "区域",
                        style: { "margin-bottom": "8px" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_select, {
                            value: __props.modelValue.area,
                            "onUpdate:value": onAreaChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_a_select_option, { value: "all" }, {
                                default: withCtx(() => [..._cache[9] || (_cache[9] = [
                                  createTextVNode("全部", -1)
                                ])]),
                                _: 1
                              }),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options.areas, (a) => {
                                return openBlock(), createBlock(_component_a_select_option, {
                                  key: a,
                                  value: a
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(a) + "区", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["value"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_col, { span: 12 }, {
                    default: withCtx(() => [
                      createVNode(_component_a_form_item, {
                        label: "排号",
                        style: { "margin-bottom": "8px" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_select, {
                            value: __props.modelValue.row,
                            "onUpdate:value": onRowChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_a_select_option, { value: "all" }, {
                                default: withCtx(() => [..._cache[10] || (_cache[10] = [
                                  createTextVNode("全部", -1)
                                ])]),
                                _: 1
                              }),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options.rows, (r) => {
                                return openBlock(), createBlock(_component_a_select_option, {
                                  key: r,
                                  value: r
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(r) + "排", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 128))
                            ]),
                            _: 1
                          }, 8, ["value"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                label: "层级",
                style: { "margin-bottom": "8px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    value: __props.modelValue.level,
                    "onUpdate:value": _cache[1] || (_cache[1] = (val) => updateField("level", val))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_select_option, { value: "all" }, {
                        default: withCtx(() => [..._cache[11] || (_cache[11] = [
                          createTextVNode("全部", -1)
                        ])]),
                        _: 1
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options.levels, (l) => {
                        return openBlock(), createBlock(_component_a_select_option, {
                          key: l,
                          value: l
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(l) + "层", 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                label: "负责人",
                style: { "margin-bottom": "8px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    value: __props.modelValue.owner,
                    "onUpdate:value": _cache[2] || (_cache[2] = (val) => updateField("owner", val)),
                    placeholder: "选择负责人",
                    "allow-clear": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_select_option, { value: "all" }, {
                        default: withCtx(() => [..._cache[12] || (_cache[12] = [
                          createTextVNode("全部", -1)
                        ])]),
                        _: 1
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options.owners, (o) => {
                        return openBlock(), createBlock(_component_a_select_option, {
                          key: o,
                          value: o
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(o), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                label: "状态",
                style: { "margin-bottom": "8px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_select, {
                    value: __props.modelValue.status,
                    "onUpdate:value": _cache[3] || (_cache[3] = (val) => updateField("status", val))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_select_option, { value: "all" }, {
                        default: withCtx(() => [..._cache[13] || (_cache[13] = [
                          createTextVNode("全部", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_a_select_option, { value: "empty" }, {
                        default: withCtx(() => [..._cache[14] || (_cache[14] = [
                          createTextVNode("空置", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_a_select_option, { value: "low" }, {
                        default: withCtx(() => [..._cache[15] || (_cache[15] = [
                          createTextVNode("低占用", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_a_select_option, { value: "medium" }, {
                        default: withCtx(() => [..._cache[16] || (_cache[16] = [
                          createTextVNode("中占用", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_a_select_option, { value: "high" }, {
                        default: withCtx(() => [..._cache[17] || (_cache[17] = [
                          createTextVNode("高占用", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                label: "占用率区间 (%)",
                style: { "margin-bottom": "8px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_row, {
                    gutter: 8,
                    align: "middle"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_col, { span: 11 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_input_number, {
                            value: __props.modelValue.usageMin,
                            min: 0,
                            max: 100,
                            style: { "width": "100%" },
                            "onUpdate:value": _cache[4] || (_cache[4] = (val) => updateField("usageMin", val))
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_a_col, {
                        span: 2,
                        style: { "text-align": "center" }
                      }, {
                        default: withCtx(() => [..._cache[18] || (_cache[18] = [
                          createTextVNode("-", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_a_col, { span: 11 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_input_number, {
                            value: __props.modelValue.usageMax,
                            min: 0,
                            max: 100,
                            style: { "width": "100%" },
                            "onUpdate:value": _cache[5] || (_cache[5] = (val) => updateField("usageMax", val))
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_a_form_item, {
                label: "最小剩余容量",
                style: { "margin-bottom": "12px" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_input_number, {
                    value: __props.modelValue.minRemaining,
                    placeholder: "例如: 50",
                    style: { "width": "100%" },
                    min: 0,
                    "onUpdate:value": _cache[6] || (_cache[6] = (val) => updateField("minRemaining", val))
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_a_button, {
                type: "dashed",
                block: "",
                size: "small",
                onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("reset"))
              }, {
                default: withCtx(() => [..._cache[19] || (_cache[19] = [
                  createTextVNode("重置", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const _sfc_main$2 = {
  __name: "ChartsPanel",
  props: {
    filteredBins: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const pieContainer = ref(null);
    const colContainer = ref(null);
    let pieChart = null;
    let colChart = null;
    const pieData = computed(() => [
      { type: "空置", value: props.filteredBins.filter((b) => b.status === "empty").length },
      { type: "低占用", value: props.filteredBins.filter((b) => b.status === "low").length },
      { type: "中占用", value: props.filteredBins.filter((b) => b.status === "medium").length },
      { type: "高占用", value: props.filteredBins.filter((b) => b.status === "high").length }
    ]);
    const colData = computed(() => props.options.areas.map((a) => ({
      area: a + "区",
      count: props.filteredBins.filter((b) => b.area === a).length
    })));
    const commonConfig = {
      theme: "classicDark",
      padding: "auto",
      autoFit: true
    };
    const initCharts = () => {
      if (pieContainer.value && !pieChart) {
        pieChart = new Pie(pieContainer.value, {
          ...commonConfig,
          data: pieData.value,
          angleField: "value",
          colorField: "type",
          radius: 0.8,
          // innerRadius: 0.6, // 移除内径，变为实心饼图
          color: ["#434343", "#389e0d", "#d48806", "#cf1322"],
          label: {
            type: "inner",
            offset: "-30%",
            content: "{value}",
            style: { textAlign: "center", fontSize: 10, fill: "#fff" }
          },
          legend: { position: "bottom", flipPage: false, itemHeight: 10 }
        });
        pieChart.render();
      }
      if (colContainer.value && !colChart) {
        colChart = new Column(colContainer.value, {
          ...commonConfig,
          data: colData.value,
          xField: "area",
          yField: "count",
          color: "#1890ff",
          columnWidthRatio: 0.6,
          label: { position: "middle", style: { fill: "#fff" } },
          xAxis: { label: { autoHide: true, autoRotate: false } }
        });
        colChart.render();
      }
    };
    onMounted(() => {
      initCharts();
    });
    watch(pieData, (newData) => {
      if (pieChart) pieChart.changeData(newData);
    });
    watch(colData, (newData) => {
      if (colChart) colChart.changeData(newData);
    });
    onUnmounted(() => {
      if (pieChart) pieChart.destroy();
      if (colChart) colChart.destroy();
    });
    return (_ctx, _cache) => {
      const _component_a_card = resolveComponent("a-card");
      const _component_a_space = resolveComponent("a-space");
      return openBlock(), createBlock(_component_a_space, {
        direction: "vertical",
        style: { "width": "100%" },
        size: "middle"
      }, {
        default: withCtx(() => [
          createVNode(_component_a_card, {
            size: "small",
            class: "glass-card",
            title: "库存状态分布"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "pieContainer",
                ref: pieContainer,
                style: { "height": "200px", "padding": "0" }
              }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_a_card, {
            size: "small",
            class: "glass-card",
            title: "区域库存统计"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "colContainer",
                ref: colContainer,
                style: { "height": "200px", "padding": "0" }
              }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_a_card, {
            size: "small",
            class: "glass-card",
            title: "操作日志 (最新5条)"
          }, {
            default: withCtx(() => [..._cache[0] || (_cache[0] = [
              createBaseVNode("div", { style: { "font-size": "12px", "color": "rgba(255,255,255,0.45)" } }, [
                createBaseVNode("p", { style: { "margin-bottom": "4px" } }, "• User1 更新了 BIN-005 (+10%)"),
                createBaseVNode("p", { style: { "margin-bottom": "4px" } }, "• User3 释放了 BIN-012 (空置)"),
                createBaseVNode("p", { style: { "margin-bottom": "4px" } }, "• User2 盘点了 A区"),
                createBaseVNode("p", { style: { "margin-bottom": "4px" } }, "• System 自动同步数据完成"),
                createBaseVNode("p", { style: { "margin-bottom": "0" } }, "• User1 导出了 CSV 报表")
              ], -1)
            ])]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$1 = { class: "toolbar" };
const _hoisted_2$1 = {
  key: 0,
  style: { "text-align": "center", "padding": "50px" }
};
const _hoisted_3$1 = {
  key: 2,
  style: { "display": "grid", "grid-template-columns": "repeat(auto-fill, minmax(100px, 1fr))", "gap": "10px" }
};
const _hoisted_4$1 = ["onClick"];
const _hoisted_5$1 = { class: "bin-item-content" };
const _hoisted_6$1 = { style: { "font-size": "12px", "font-weight": "600", "margin-bottom": "4px" } };
const _hoisted_7 = { style: { "font-size": "18px", "font-weight": "800", "margin": "4px 0" } };
const _hoisted_8 = { style: { "font-size": "10px", "opacity": "0.8" } };
const _hoisted_9 = {
  key: 0,
  style: { "text-align": "center" }
};
const _hoisted_10 = { style: { "text-align": "left", "background": "rgba(255,255,255,0.04)", "padding": "16px", "border-radius": "4px" } };
const _hoisted_11 = { style: { "margin-bottom": "8px", "display": "flex", "justify-content": "space-between" } };
const _hoisted_12 = { style: { "margin-bottom": "8px", "display": "flex", "justify-content": "space-between" } };
const _hoisted_13 = { style: { "margin-bottom": "8px", "display": "flex", "justify-content": "space-between" } };
const _hoisted_14 = { style: { "margin-bottom": "0", "display": "flex", "justify-content": "space-between" } };
const _sfc_main$1 = {
  __name: "Dashboard",
  setup(__props) {
    const binsData = ref([]);
    const loading = ref(true);
    const filters = ref({
      id: "",
      area: "all",
      row: "all",
      level: "all",
      owner: "all",
      status: "all",
      usageMin: 0,
      usageMax: 100,
      minRemaining: null
    });
    const selectedBin = ref(null);
    const isModalVisible = ref(false);
    const isInventoryModalVisible = ref(false);
    const inventoryData = ref([]);
    const inventoryLoading = ref(false);
    const displayCount = ref(100);
    const isFullscreen = ref(false);
    const binsWrapperRef = ref(null);
    const generateBinsData = (count) => {
      const bins = [];
      for (let i = 1; i <= count; i++) {
        const usage = Number((Math.random() * 100).toFixed(1));
        let status = usage === 0 ? "empty" : usage <= 40 ? "low" : usage <= 70 ? "medium" : "high";
        const area = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
        const row = Math.ceil(i / 25);
        const col = (i % 25 || 25).toString().padStart(2, "0");
        bins.push({
          id: `BIN-${i.toString().padStart(3, "0")}`,
          usage,
          status,
          capacity: Math.floor(Math.random() * 100) + 50,
          items: Math.floor(usage * Math.random() * 0.8) + 1,
          location: `${area}${row}-${col}`,
          area,
          rowId: row.toString(),
          level: Math.floor(Math.random() * 5) + 1,
          owner: `User${Math.floor(Math.random() * 10)}`,
          lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1e3)).toISOString()
        });
      }
      return bins;
    };
    const getStatusColor = (status) => {
      const map = { empty: "default", low: "success", medium: "warning", high: "error" };
      return map[status];
    };
    const loadData = async () => {
      loading.value = true;
      try {
        const response = await fetch("./bins_data.json");
        if (!response.ok) throw new Error("Network error");
        binsData.value = await response.json();
        api.success("数据刷新成功");
      } catch (err) {
        console.warn("Load failed, using mock data:", err);
        binsData.value = generateBinsData(500);
        api.info("演示模式：使用模拟数据");
      } finally {
        loading.value = false;
      }
    };
    const fetchInventory = async (binId) => {
      inventoryLoading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const count = Math.floor(Math.random() * 5) + 1;
      const data = [];
      for (let i = 0; i < count; i++) {
        data.push({
          id: `${binId}-MAT-${i + 1}`,
          materialNo: `M${Math.floor(Math.random() * 1e4).toString().padStart(4, "0")}`,
          desc: `物料描述 ${String.fromCharCode(65 + i)}`,
          unit: ["PCS", "BOX", "KG"][Math.floor(Math.random() * 3)],
          supplier: `供应商 ${String.fromCharCode(88 + i)}`,
          qty: Math.floor(Math.random() * 100) + 10
        });
      }
      inventoryData.value = data;
      inventoryLoading.value = false;
    };
    const filteredBins = computed(() => {
      return binsData.value.filter((bin) => {
        if (filters.value.id && !bin.id.toLowerCase().includes(filters.value.id.toLowerCase())) return false;
        if (filters.value.area !== "all" && bin.area !== filters.value.area) return false;
        if (filters.value.row !== "all" && String(bin.rowId) !== String(filters.value.row)) return false;
        if (filters.value.level !== "all" && String(bin.level) !== String(filters.value.level)) return false;
        if (filters.value.owner !== "all" && bin.owner !== filters.value.owner) return false;
        if (filters.value.status !== "all" && bin.status !== filters.value.status) return false;
        if (bin.usage < filters.value.usageMin || bin.usage > filters.value.usageMax) return false;
        if (filters.value.minRemaining !== null && filters.value.minRemaining !== "") {
          const remaining = bin.capacity - bin.items;
          if (remaining < Number(filters.value.minRemaining)) return false;
        }
        return true;
      });
    });
    const displayedBins = computed(() => filteredBins.value.slice(0, displayCount.value));
    const options = computed(() => {
      const areas = [...new Set(binsData.value.map((b) => b.area))].sort();
      const owners = [...new Set(binsData.value.map((b) => b.owner).filter(Boolean))].sort();
      const currentAreaBins = filters.value.area === "all" ? binsData.value : binsData.value.filter((b) => b.area === filters.value.area);
      const rows = [...new Set(currentAreaBins.map((b) => b.rowId))].sort();
      const currentRowBins = filters.value.row === "all" ? currentAreaBins : currentAreaBins.filter((b) => b.rowId === filters.value.row);
      const levels = [...new Set(currentRowBins.map((b) => b.level))].sort((a, b) => a - b);
      return { areas, rows, levels, owners };
    });
    const stats = computed(() => {
      const total = filteredBins.value.length;
      const used = filteredBins.value.filter((b) => b.usage > 0).length;
      const totalUsageSum = filteredBins.value.reduce((sum, bin) => sum + bin.usage, 0);
      const avgUsage = total > 0 ? (totalUsageSum / total).toFixed(1) : 0;
      const occupancy = total > 0 ? Math.round(used / total * 100) : 0;
      return { total, used, available: total - used, occupancy, avgUsage };
    });
    const inventoryColumns = [
      { title: "物料号", dataIndex: "materialNo", width: 100 },
      { title: "描述", dataIndex: "desc", width: 150, ellipsis: true },
      { title: "单位", dataIndex: "unit", width: 60, align: "center" },
      { title: "供应商", dataIndex: "supplier", width: 100, ellipsis: true },
      { title: "数量", dataIndex: "qty", width: 80, align: "right" }
    ];
    watch(filteredBins, () => {
      displayCount.value = 100;
      if (binsWrapperRef.value) binsWrapperRef.value.scrollTop = 0;
    });
    onMounted(() => {
      loadData();
    });
    const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      if (scrollHeight - scrollTop - clientHeight < 50 && displayCount.value < filteredBins.value.length) {
        displayCount.value += 50;
      }
    };
    const resetFilters = () => {
      filters.value = {
        id: "",
        area: "all",
        row: "all",
        level: "all",
        owner: "all",
        status: "all",
        usageMin: 0,
        usageMax: 100,
        minRemaining: null
      };
    };
    const showDetail = (bin) => {
      selectedBin.value = bin;
      isModalVisible.value = true;
    };
    const showInventory = () => {
      if (selectedBin.value) {
        fetchInventory(selectedBin.value.id);
        isInventoryModalVisible.value = true;
      }
    };
    const exportCSV = () => {
      const headers = "BIN ID,区域,排,层,状态,使用率,容量,负责人,更新时间\n";
      const rows = filteredBins.value.map((b) => `${b.id},${b.area},${b.rowId},${b.level},${b.status},${b.usage}%,${b.capacity},${b.owner},${b.lastUpdated}`).join("\n");
      const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bins_export.csv";
      link.click();
    };
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        isFullscreen.value = true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          isFullscreen.value = false;
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_a_space = resolveComponent("a-space");
      const _component_a_layout_sider = resolveComponent("a-layout-sider");
      const _component_a_statistic = resolveComponent("a-statistic");
      const _component_a_col = resolveComponent("a-col");
      const _component_a_row = resolveComponent("a-row");
      const _component_a_card = resolveComponent("a-card");
      const _component_a_button = resolveComponent("a-button");
      const _component_a_tooltip = resolveComponent("a-tooltip");
      const _component_a_spin = resolveComponent("a-spin");
      const _component_a_empty = resolveComponent("a-empty");
      const _component_a_layout_content = resolveComponent("a-layout-content");
      const _component_a_typography_title = resolveComponent("a-typography-title");
      const _component_a_typography_text = resolveComponent("a-typography-text");
      const _component_a_tag = resolveComponent("a-tag");
      const _component_a_modal = resolveComponent("a-modal");
      const _component_a_table = resolveComponent("a-table");
      const _component_a_layout = resolveComponent("a-layout");
      return openBlock(), createBlock(_component_a_layout, { style: { "height": "100%", "background": "transparent" } }, {
        default: withCtx(() => [
          createVNode(_component_a_layout_sider, {
            width: "240",
            class: "glass-sider",
            style: { "padding": "12px", "overflow-y": "auto" }
          }, {
            default: withCtx(() => [
              createVNode(_component_a_space, {
                direction: "vertical",
                style: { "width": "100%" },
                size: "middle"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    modelValue: filters.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filters.value = $event),
                    options: options.value,
                    onReset: resetFilters
                  }, null, 8, ["modelValue", "options"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_a_layout_content, { style: { "padding": "12px", "display": "flex", "flex-direction": "column", "height": "100%", "overflow": "hidden", "position": "relative" } }, {
            default: withCtx(() => [
              createVNode(_component_a_card, {
                size: "small",
                class: "glass-card",
                style: { "margin-bottom": "12px", "flex-shrink": "0" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_a_row, {
                    gutter: 16,
                    align: "middle",
                    justify: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_col, { flex: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_statistic, {
                            title: "总库存位",
                            value: stats.value.total,
                            class: "stat-card",
                            "value-style": { color: "#a0c4ff", fontSize: "24px" }
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_a_col, { flex: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_statistic, {
                            title: "已使用",
                            value: stats.value.used,
                            class: "stat-card",
                            "value-style": { color: "#faad14", fontSize: "24px" }
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_a_col, { flex: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_statistic, {
                            title: "未使用",
                            value: stats.value.available,
                            class: "stat-card",
                            "value-style": { color: "#52c41a", fontSize: "24px" }
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_a_col, { flex: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_statistic, {
                            title: "当前区域占用率",
                            value: stats.value.occupancy,
                            suffix: "%",
                            class: "stat-card",
                            "value-style": { color: "#fff", fontSize: "24px" }
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_a_col, { flex: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_a_statistic, {
                            title: "平均使用率",
                            value: stats.value.avgUsage,
                            suffix: "%",
                            class: "stat-card",
                            "value-style": { color: "#fff", fontSize: "24px" }
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createBaseVNode("div", _hoisted_1$1, [
                createVNode(_component_a_tooltip, { title: "刷新数据" }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "text",
                      style: { "color": "#fff" },
                      onClick: loadData
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(ReloadOutlined))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_a_tooltip, {
                  title: isFullscreen.value ? "退出全屏" : "全屏模式"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "text",
                      style: { "color": "#fff" },
                      onClick: toggleFullscreen
                    }, {
                      icon: withCtx(() => [
                        isFullscreen.value ? (openBlock(), createBlock(unref(FullscreenExitOutlined), { key: 0 })) : (openBlock(), createBlock(unref(FullscreenOutlined), { key: 1 }))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["title"]),
                createVNode(_component_a_tooltip, { title: "导出数据" }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "text",
                      style: { "color": "#fff" },
                      onClick: exportCSV
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(ExportOutlined))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("div", {
                ref_key: "binsWrapperRef",
                ref: binsWrapperRef,
                class: "bins-wrapper",
                style: { "flex": "1", "overflow-y": "auto", "padding": "10px", "border": "1px solid rgba(255, 255, 255, 0.1)", "border-radius": "4px" },
                onScroll: handleScroll
              }, [
                loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                  createVNode(_component_a_spin)
                ])) : filteredBins.value.length === 0 ? (openBlock(), createBlock(_component_a_empty, {
                  key: 1,
                  description: "暂无数据",
                  style: { "margin-top": "100px" }
                })) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(displayedBins.value, (bin) => {
                    return openBlock(), createElementBlock("div", {
                      key: bin.id,
                      class: normalizeClass(["bin-item", `bin-status-${bin.status}`]),
                      onClick: ($event) => showDetail(bin)
                    }, [
                      createBaseVNode("div", _hoisted_5$1, [
                        createBaseVNode("div", _hoisted_6$1, toDisplayString(bin.id), 1),
                        createBaseVNode("div", _hoisted_7, toDisplayString(bin.usage) + "%", 1),
                        createBaseVNode("div", _hoisted_8, toDisplayString(bin.location), 1)
                      ])
                    ], 10, _hoisted_4$1);
                  }), 128))
                ]))
              ], 544)
            ]),
            _: 1
          }),
          createVNode(_component_a_layout_sider, {
            width: "280",
            class: "glass-sider",
            style: { "padding": "12px", "overflow-y": "auto" }
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$2, {
                "filtered-bins": filteredBins.value,
                options: options.value
              }, null, 8, ["filtered-bins", "options"])
            ]),
            _: 1
          }),
          createVNode(_component_a_modal, {
            open: isModalVisible.value,
            "onUpdate:open": _cache[2] || (_cache[2] = ($event) => isModalVisible.value = $event),
            footer: null,
            width: "320px",
            centered: ""
          }, {
            title: withCtx(() => [
              createVNode(_component_a_space, null, {
                default: withCtx(() => [
                  createVNode(unref(HddOutlined)),
                  createTextVNode(" 库位详情: " + toDisplayString(selectedBin.value?.id), 1)
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              selectedBin.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
                createVNode(_component_a_typography_title, {
                  level: 3,
                  style: { "color": "#1890ff", "margin": "0" }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(selectedBin.value.usage) + "%", 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_a_typography_text, {
                  type: "secondary",
                  style: { "display": "block", "margin-bottom": "20px" }
                }, {
                  default: withCtx(() => [..._cache[4] || (_cache[4] = [
                    createTextVNode("当前占用率", -1)
                  ])]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("p", _hoisted_11, [
                    _cache[5] || (_cache[5] = createBaseVNode("span", null, "位置坐标:", -1)),
                    createBaseVNode("strong", null, toDisplayString(selectedBin.value.location), 1)
                  ]),
                  createBaseVNode("p", _hoisted_12, [
                    _cache[6] || (_cache[6] = createBaseVNode("span", null, "当前状态:", -1)),
                    createVNode(_component_a_tag, {
                      color: getStatusColor(selectedBin.value.status)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(selectedBin.value.status.toUpperCase()), 1)
                      ]),
                      _: 1
                    }, 8, ["color"])
                  ]),
                  createBaseVNode("p", _hoisted_13, [
                    _cache[7] || (_cache[7] = createBaseVNode("span", null, "容量情况:", -1)),
                    createBaseVNode("span", null, toDisplayString(selectedBin.value.items) + " / " + toDisplayString(selectedBin.value.capacity), 1)
                  ]),
                  createBaseVNode("p", _hoisted_14, [
                    _cache[8] || (_cache[8] = createBaseVNode("span", null, "负责人:", -1)),
                    createBaseVNode("span", null, toDisplayString(selectedBin.value.owner), 1)
                  ])
                ]),
                createVNode(_component_a_space, {
                  direction: "vertical",
                  style: { "width": "100%", "margin-top": "20px" }
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "primary",
                      ghost: "",
                      block: "",
                      onClick: showInventory
                    }, {
                      default: withCtx(() => [..._cache[9] || (_cache[9] = [
                        createTextVNode("查看物料详情", -1)
                      ])]),
                      _: 1
                    }),
                    createVNode(_component_a_button, {
                      block: "",
                      onClick: _cache[1] || (_cache[1] = ($event) => isModalVisible.value = false)
                    }, {
                      default: withCtx(() => [..._cache[10] || (_cache[10] = [
                        createTextVNode("关闭", -1)
                      ])]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["open"]),
          createVNode(_component_a_modal, {
            open: isInventoryModalVisible.value,
            "onUpdate:open": _cache[3] || (_cache[3] = ($event) => isInventoryModalVisible.value = $event),
            footer: null,
            width: "600px",
            centered: "",
            title: "物料库存详情"
          }, {
            default: withCtx(() => [
              createVNode(_component_a_table, {
                columns: inventoryColumns,
                "data-source": inventoryData.value,
                size: "small",
                pagination: false,
                scroll: { y: 300 },
                loading: inventoryLoading.value,
                "row-key": "id"
              }, null, 8, ["data-source", "loading"])
            ]),
            _: 1
          }, 8, ["open"])
        ]),
        _: 1
      });
    };
  }
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c0bb848a"]]);
const _hoisted_1 = { style: { "height": "100%", "display": "flex", "flex-direction": "column", "padding": "12px", "gap": "12px", "overflow": "hidden" } };
const _hoisted_2 = { style: { "flex": "1", "display": "flex", "gap": "12px", "min-height": "0" } };
const _hoisted_3 = {
  key: 0,
  style: { "color": "#ff4d4f", "font-weight": "bold" }
};
const _hoisted_4 = { style: { "flex": "1", "display": "flex", "gap": "12px", "min-height": "0" } };
const _hoisted_5 = {
  key: 0,
  style: { "color": "#faad14", "font-weight": "bold" }
};
const _hoisted_6 = {
  key: 0,
  style: { "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)" }
};
const _sfc_main = {
  __name: "StatisticsAnalysis",
  setup(__props) {
    const loading = ref(true);
    const chart1Ref = ref(null);
    const chart2Ref = ref(null);
    const chart3Ref = ref(null);
    const chart4Ref = ref(null);
    const rawData = ref([]);
    let charts = [];
    const columns = [
      { title: "区域", dataIndex: "area", key: "area", width: 60, align: "center" },
      { title: "货架-层", key: "shelf", width: 80, customRender: ({ record }) => `${record.rowId}-${record.level}`, align: "center" },
      { title: "BIN编码", dataIndex: "id", key: "id", width: 100, ellipsis: true, align: "center" },
      { title: "数量", dataIndex: "items", key: "items", width: 60, align: "center" },
      { title: "最大容量", dataIndex: "capacity", key: "capacity", width: 80, align: "center" },
      { title: "占用率", dataIndex: "usage", key: "usage", width: 70, align: "center" }
    ];
    const highUsageData = computed(() => {
      return rawData.value.filter((d) => d.usage > 90).sort((a, b) => b.usage - a.usage).slice(0, 30);
    });
    const lowUsageData = computed(() => {
      return rawData.value.filter((d) => d.usage > 0 && d.usage <= 30 && d.items > 0).sort((a, b) => a.usage - b.usage).slice(0, 30);
    });
    const loadData = async () => {
      try {
        const response = await fetch("./bins_data.json");
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        rawData.value = data;
        await nextTick();
        initChart1(data);
        initChart2(data);
        initChart3(data);
        initChart4(data);
      } catch (err) {
        console.error("Failed to load data:", err);
        api.error("数据加载失败");
      } finally {
        loading.value = false;
      }
    };
    const initChart1 = (data) => {
      if (!chart1Ref.value) return;
      const chart = init(chart1Ref.value, "dark");
      charts.push(chart);
      const areas = [...new Set(data.map((d) => d.area))].sort();
      const yAxisData = [];
      const areaRowsMap = {};
      data.forEach((d) => {
        if (!areaRowsMap[d.area]) areaRowsMap[d.area] = /* @__PURE__ */ new Set();
        areaRowsMap[d.area].add(Number(d.rowId));
      });
      areas.forEach((area) => {
        const rows = Array.from(areaRowsMap[area] || []).sort((a, b) => a - b);
        rows.forEach((row) => yAxisData.push(`${area}区-${row}排`));
      });
      const maxCol = 25;
      const xAxisData = Array.from({ length: maxCol }, (_, i) => (i + 1).toString().padStart(2, "0"));
      const chartData = [];
      data.forEach((bin) => {
        const yIndex = yAxisData.indexOf(`${bin.area}区-${bin.rowId}排`);
        const colIndex = parseInt(bin.location.split("-")[1], 10) - 1;
        if (yIndex !== -1 && colIndex >= 0) chartData.push([colIndex, yIndex, bin.usage]);
      });
      chart.setOption({
        backgroundColor: "transparent",
        tooltip: { position: "top" },
        grid: { top: 10, bottom: 10, left: 60, right: 60 },
        xAxis: { type: "category", data: xAxisData, axisLabel: { fontSize: 8, color: "#aaa" } },
        yAxis: { type: "category", data: yAxisData, axisLabel: { fontSize: 8, color: "#aaa" } },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: "vertical",
          // 改为垂直
          right: "0",
          // 放在右侧
          top: "center",
          // 垂直居中
          inRange: { color: ["#1a2a3a", "#52c41a", "#faad14", "#ff4d4f"] },
          textStyle: { color: "#fff", fontSize: 9 },
          itemWidth: 10,
          itemHeight: 80
        },
        series: [{ type: "heatmap", data: chartData, itemStyle: { borderColor: "#001529", borderWidth: 1 } }]
      });
    };
    const initChart2 = (data) => {
      if (!chart2Ref.value) return;
      const chart = init(chart2Ref.value, "dark");
      charts.push(chart);
      let empty = 0, low = 0, medium = 0, high = 0;
      data.forEach((d) => {
        if (d.usage === 0) empty++;
        else if (d.usage <= 30) low++;
        else if (d.usage <= 70) medium++;
        else high++;
      });
      const pieData = [
        { value: empty, name: "空置", itemStyle: { color: "#434343" } },
        { value: low, name: "低占用", itemStyle: { color: "#52c41a" } },
        { value: medium, name: "中占用", itemStyle: { color: "#faad14" } },
        { value: high, name: "高占用", itemStyle: { color: "#ff4d4f" } }
      ];
      chart.setOption({
        backgroundColor: "transparent",
        tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
        legend: { orient: "vertical", right: "0", top: "middle", textStyle: { color: "#fff", fontSize: 10 } },
        // 右侧图例
        series: [{
          name: "占用等级",
          type: "pie",
          radius: ["40%", "65%"],
          center: ["40%", "50%"],
          // 图表左移
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 5, borderColor: "#001529", borderWidth: 2 },
          label: { show: false, position: "center" },
          emphasis: { label: { show: true, fontSize: "14", fontWeight: "bold", color: "#fff", formatter: "{d}%" } },
          labelLine: { show: false },
          data: pieData
        }]
      });
    };
    const initChart3 = (data) => {
      if (!chart3Ref.value) return;
      const chart = init(chart3Ref.value, "dark");
      charts.push(chart);
      const stats = {};
      data.forEach((d) => {
        if (!stats[d.area]) stats[d.area] = { total: 0, used: 0 };
        stats[d.area].total++;
        if (d.usage > 0) stats[d.area].used++;
      });
      const areas = Object.keys(stats).sort();
      const totalData = areas.map((a) => stats[a].total);
      const usedData = areas.map((a) => stats[a].used);
      const rateData = areas.map((a) => Math.round(stats[a].used / stats[a].total * 100));
      chart.setOption({
        backgroundColor: "transparent",
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        legend: { orient: "vertical", right: "0", top: "middle", textStyle: { color: "#fff", fontSize: 10 } },
        // 右侧图例
        grid: { left: "30", right: "80", bottom: "20", top: "10", containLabel: true },
        xAxis: { type: "category", data: areas, axisLabel: { color: "#fff" } },
        yAxis: [
          { type: "value", name: "", show: false },
          { type: "value", name: "", show: false }
        ],
        series: [
          { name: "总数", type: "bar", data: totalData, itemStyle: { color: "rgba(255, 255, 255, 0.1)" }, barGap: "-100%" },
          { name: "已占用", type: "bar", data: usedData, itemStyle: { color: "#1890ff" } },
          { name: "占用率", type: "line", yAxisIndex: 1, data: rateData, itemStyle: { color: "#52c41a" }, label: { show: true, formatter: "{c}%", color: "#fff" } }
        ]
      });
    };
    const initChart4 = (data) => {
      if (!chart4Ref.value) return;
      const chart = init(chart4Ref.value, "dark");
      charts.push(chart);
      const stats = {};
      data.forEach((d) => {
        if (!stats[d.level]) stats[d.level] = 0;
        if (d.usage > 0) stats[d.level]++;
      });
      const levels = Object.keys(stats).sort((a, b) => a - b);
      const chartData = levels.map((l) => stats[l]);
      chart.setOption({
        backgroundColor: "transparent",
        tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
        grid: { left: "10", right: "30", bottom: "20", top: "10", containLabel: true },
        xAxis: { type: "value", show: false },
        yAxis: { type: "category", data: levels.map((l) => `${l}层`), axisLabel: { color: "#fff" } },
        series: [
          {
            name: "占用数量",
            type: "bar",
            data: chartData,
            itemStyle: { color: new LinearGradient(1, 0, 0, 0, [{ offset: 0, color: "#f7b500" }, { offset: 1, color: "#b620e0" }]) },
            label: { show: true, position: "right", color: "#fff" }
          }
        ]
      });
    };
    const handleResize = () => {
      charts.forEach((c) => c.resize());
    };
    onMounted(() => {
      loadData();
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((c) => c.dispose());
    });
    return (_ctx, _cache) => {
      const _component_a_card = resolveComponent("a-card");
      const _component_a_table = resolveComponent("a-table");
      const _component_a_tooltip = resolveComponent("a-tooltip");
      const _component_a_spin = resolveComponent("a-spin");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_a_card, {
            class: "glass-card",
            title: "全仓存储热力分布",
            bordered: false,
            style: { "flex": "1", "display": "flex", "flex-direction": "column" },
            bodyStyle: { flex: 1, padding: "10px", minHeight: 0 }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "chart1Ref",
                ref: chart1Ref,
                style: { "width": "100%", "height": "100%" }
              }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_a_card, {
            class: "glass-card",
            title: "库存占用等级分布",
            bordered: false,
            style: { "flex": "1", "display": "flex", "flex-direction": "column" },
            bodyStyle: { flex: 1, padding: "10px", minHeight: 0 }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "chart2Ref",
                ref: chart2Ref,
                style: { "width": "100%", "height": "100%" }
              }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_a_card, {
            class: "glass-card",
            title: "高占用 BIN 位提醒 (>90%)",
            bordered: false,
            style: { "flex": "1", "display": "flex", "flex-direction": "column" },
            bodyStyle: { flex: 1, padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }
          }, {
            default: withCtx(() => [
              createVNode(_component_a_table, {
                columns,
                "data-source": highUsageData.value,
                size: "small",
                pagination: false,
                scroll: { y: 350 },
                "row-key": "id",
                class: "custom-table",
                style: { "height": "100%" }
              }, {
                bodyCell: withCtx(({ column, record }) => [
                  column.key === "usage" ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(record.usage) + "%", 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["data-source"])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_4, [
          createVNode(_component_a_card, {
            class: "glass-card",
            title: "各区域库存统计",
            bordered: false,
            style: { "flex": "1", "display": "flex", "flex-direction": "column" },
            bodyStyle: { flex: 1, padding: "10px", minHeight: 0 }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "chart3Ref",
                ref: chart3Ref,
                style: { "width": "100%", "height": "100%" }
              }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_a_card, {
            class: "glass-card",
            title: "各层级存储分布",
            bordered: false,
            style: { "flex": "1", "display": "flex", "flex-direction": "column" },
            bodyStyle: { flex: 1, padding: "10px", minHeight: 0 }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                ref_key: "chart4Ref",
                ref: chart4Ref,
                style: { "width": "100%", "height": "100%" }
              }, null, 512)
            ]),
            _: 1
          }),
          createVNode(_component_a_card, {
            class: "glass-card",
            bordered: false,
            style: { "flex": "1", "display": "flex", "flex-direction": "column" },
            bodyStyle: { flex: 1, padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }
          }, {
            title: withCtx(() => [
              _cache[0] || (_cache[0] = createBaseVNode("span", null, "低占用 BIN 位提醒 (1-30%)", -1)),
              createVNode(_component_a_tooltip, { title: "筛选逻辑：占用率 > 0 且 <= 30%，且当前存储数量 > 0" }, {
                default: withCtx(() => [
                  createVNode(unref(InfoCircleOutlined), { style: { "margin-left": "8px", "color": "rgba(255,255,255,0.5)", "cursor": "pointer" } })
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(_component_a_table, {
                columns,
                "data-source": lowUsageData.value,
                size: "small",
                pagination: false,
                scroll: { y: 350 },
                "row-key": "id",
                class: "custom-table",
                style: { "height": "100%" }
              }, {
                bodyCell: withCtx(({ column, record }) => [
                  column.key === "usage" ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(record.usage) + "%", 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["data-source"])
            ]),
            _: 1
          })
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createVNode(_component_a_spin, { tip: "加载数据中..." })
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const StatisticsAnalysis = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4d919598"]]);
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: StatisticsAnalysis
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  // 改为 Hash 模式，适应性更强
  routes
});
const app = createApp(_sfc_main$4);
app.use(Antd);
app.use(router);
app.mount("#app");
//# sourceMappingURL=index.js.map
