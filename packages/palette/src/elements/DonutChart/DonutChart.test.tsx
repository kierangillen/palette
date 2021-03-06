import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Theme } from "../../Theme"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { DonutChart, DonutChartProps } from "./DonutChart"

jest.useFakeTimers()

const mockPoints = [
  { value: 0, axisLabelX: "x axis label" },
  { value: 100, axisLabelX: <div id="x-axis">lol</div> },
  {
    value: 200,
    tooltip: (
      <Flex alignItems="center" flexDirection="column">
        <Sans size="2" weight="medium">
          Sept 30
        </Sans>
        <Sans size="2" color="black60">
          423 views
        </Sans>
      </Flex>
    ),
  },
]

describe("DonutChart", () => {
  const getWrapper = (props: Partial<DonutChartProps> = {}) => {
    return mount(
      <Theme>
        <DonutChart points={mockPoints} {...props} />
      </Theme>
    )
  }

  it("renders one path for zero state and one for each data points", () => {
    const chart = getWrapper()
    expect(chart.find("path")).toHaveLength(mockPoints.length + 1)
  })

  it("renders x axis labels labels", () => {
    const chart = getWrapper()

    expect(chart.text()).toContain("x axis label")
    expect(chart.find("#x-axis").text()).toBe("lol")
  })

  it("shows hover labels when you hover over the bar", () => {
    const chart = getWrapper()
    const hoverArea = chart.find("path").last()
    // .find("div")
    // .first()
    hoverArea.simulate("mouseenter")
    expect(chart.text()).toContain("423 views")
    hoverArea.simulate("mouseleave")
    expect(chart.text()).not.toContain("423 views")
  })
})
