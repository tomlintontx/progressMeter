prism.registerWidget("ProgressMeter", {
    name: "ProgressMeter",
    family: "Indicator",
    title: "Progress Meter",
    iconSmall: "/plugins/ProgressMeter/ProgressMeter-icon-small.png",
    styleEditorTemplate: "/plugins/ProgressMeter/styler.html",
    hideNoResults: true,
    directive: {
        desktop: "ProgressMeter"
    },
    style: {
        /* object structure for styling use, available to be changed
        using the design panel*/
        color: "black",
        prefix: "",
        postfix: ""
    },
    data: {
        selection: [],
        defaultQueryResult: {},
        panels: [
            {
                name: "Metric",
                itemAttributes: ["color"],
				allowedColoringTypes: function () {
					return {
						color: true,
						condition: true,
						range: false
					};
				},
				itemAdded(widget, item) {
                    // Adding a new color
                    if (typeof item.format === 'undefined') {
                        // Grab first color from palette
                        const firstColor = prism.activeDashboard.style.palette()[0];
                        // Create a format obj
                        item.format = {
                            color: {
                                type: 'color',
                                color: firstColor,
                            },
                            mask: {
                                type: 'number',
                                abbreviations: {
                                    t: true,
                                    b: true,
                                    m: true,
                                    k: true,
                                },
                                separated: true,
                                decimals: 'auto',
                                isdefault: true,
                            },
                        };
                    }
                    // Return the item
                    return item;
                },
                metadata: {
                    types: ['measures'],
                    maxitems: 1,
                },
                visibility: true,
            },
            {
                name: "Denominator",
                metadata: {
                    types: ['measures'],
                    maxitems: 1,
                },
                visibility: true,
            },
            {
                name: "Secondary Value",
                metadata: {
                    types: ['measures'],
                    maxitems: 1,
                },
                visibility: true,
            },
            {
                name: "filters",
                type: "filters",
                metadata: {
                    types: ["dimensions"],
                    maxitems: -1
                },
            },
        ],
        canColor: function (widget, panel, item) {
			if (panel.name == "Metric") {
				return true;
			} else {
				return false;
			}
		},
        // builds a jaql query from the given widget
        buildQuery: function (widget) {

            if (widget.metadata.panel("Metric").items.length === 0 || widget.metadata.panel("Secondary Value").items.length === 0 || widget.metadata.panel("Denominator").items.length === 0) {
                var query = {
                    datasource: widget.datasource,
                    format: "json",
                    isMaskedResult: true,
                    metadata: []
                };

                return query;

            } else {
                // building jaql query object from widget metadata
                var query = {
                    datasource: widget.datasource,
                    format: "json",
                    isMaskedResult: true,
                    metadata: []
                };

                // Metric Attr
                var curPanel = widget.metadata.panel("Metric").items[0];
                query.metadata.push(curPanel);

                //Denominator Attr
                var denominator = widget.metadata.panel("Denominator").items[0];
                query.metadata.push(denominator)

                //Target Attr
                var targetMetric = widget.metadata.panel("Secondary Value").items[0];
                query.metadata.push(targetMetric)

                // gather the filters, don't need to change
                if (defined(widget.metadata.panel("filters"), "items.0")) {
                    widget.metadata.panel("filters").items.forEach(function (item) {
                        item = $$.object.clone(item, true);
                        item.panel = "scope";
                        query.metadata.push(item);
                    });
                }

                return query;
            }
        },
        processResult: function (widget, queryResult) {
            
            return queryResult

        },
    },
    /**
     * Get all the connected dimensions selected filters
     * @param {*} widget
     * @param {*} event
     */
    beforequery(widget, event) {
    },
    render: function (widget, event) {
        var ele = $(event.element);
        ele.empty();

        var config = {
            color: widget.queryResult.$$rows[0][0].color,
            ele: ele,
            denominator: widget.queryResult.$$rows[0][1].data
        }

        if(widget.queryResult.$$rows.length > 0) {
            putMeOnTheScreen(widget, event, config);
        }

    },
    options: {
        dashboardFiltersMode: "slice",
    },
});