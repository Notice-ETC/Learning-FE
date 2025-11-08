'use client'

import { useEffect, useState, useRef } from 'react'

const TOTAL_SLIDES = 20
const SLIDE_WIDTH = 1280

export default function SlidePage() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [slideContent, setSlideContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [scale, setScale] = useState(1)
  const [slideHeight, setSlideHeight] = useState(720)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideWrapperRef = useRef<HTMLDivElement>(null)
  const slideContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Tailwind CSS and FontAwesome
    loadExternalScripts()
    loadSlide(currentSlide)
  }, [currentSlide])

  useEffect(() => {
    // Focus container on mount for keyboard navigation
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Calculate slide height and scale after content is loaded
    const updateSlideDimensions = () => {
      if (slideContentRef.current && containerRef.current) {
        // Get actual height of slide content
        const slideElement = slideContentRef.current.querySelector('.slide') as HTMLElement
        if (slideElement) {
          // Force layout recalculation
          void slideElement.offsetHeight
          
          const actualHeight =
            slideElement.offsetHeight || slideElement.scrollHeight || slideElement.clientHeight
          if (actualHeight > 0) {
            setSlideHeight(actualHeight)
          }

          // Calculate scale to fit slide in viewport
          const containerWidth = containerRef.current.clientWidth
          const containerHeight = containerRef.current.clientHeight

          const currentHeight = actualHeight || 720
          const scaleX = containerWidth / SLIDE_WIDTH
          const scaleY = containerHeight / currentHeight

          // Use the smaller scale to ensure slide fits completely
          const newScale = Math.min(scaleX, scaleY)
          
          // Ensure scale is valid (not NaN or 0)
          if (newScale > 0 && isFinite(newScale)) {
            setScale(newScale)
          } else {
            // Fallback to default scale if calculation fails
            console.warn('Scale calculation failed, using default scale')
            setScale(1)
          }
        }
      }
    }

    if (!loading && slideContent) {
      // Wait for DOM to update and images/fonts to load
      const timeoutId = setTimeout(updateSlideDimensions, 50)
      const intervalId = setInterval(() => {
        updateSlideDimensions()
      }, 100)

      // Cleanup after initial calculation
      setTimeout(() => {
        clearInterval(intervalId)
      }, 1000)

      window.addEventListener('resize', updateSlideDimensions)

      return () => {
        clearTimeout(timeoutId)
        clearInterval(intervalId)
        window.removeEventListener('resize', updateSlideDimensions)
      }
    }
  }, [loading, slideContent])

  const loadExternalScripts = () => {
    // Load Tailwind CSS
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      const tailwindScript = document.createElement('script')
      tailwindScript.src = 'https://cdn.tailwindcss.com'
      tailwindScript.async = true
      document.head.appendChild(tailwindScript)
    }

    // Load FontAwesome CSS
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fontAwesomeLink = document.createElement('link')
      fontAwesomeLink.rel = 'stylesheet'
      fontAwesomeLink.href =
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
      document.head.appendChild(fontAwesomeLink)
    }
  }

  const loadSlide = async (slideNumber: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/slides/page_${slideNumber}.html`)
      if (!response.ok) {
        throw new Error(`Failed to load slide ${slideNumber}`)
      }
      const html = await response.text()
      // Extract body content and styles from HTML
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
      const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi)
      const content = bodyMatch ? bodyMatch[1] : html

      // Inject styles if found
      if (styleMatch) {
        const styles = styleMatch.map((style) => {
          const styleContent = style.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
          return styleContent ? styleContent[1] : ''
        })
        const styleElement = document.createElement('style')
        styleElement.id = `slide-${slideNumber}-styles`
        
        // Override body and slide width/height to use 100%
        const overrideStyles = `
          body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .slide {
            width: 100% !important;
            min-height: 100% !important;
            box-sizing: border-box !important;
          }
          .slide > * {
            box-sizing: border-box !important;
          }
          /* Ensure all direct children of slide use full width */
          .slide > div {
            width: 100% !important;
            max-width: 100% !important;
          }
        `
        
        styleElement.textContent = styles.join('\n') + overrideStyles
        // Remove old styles
        const oldStyle = document.getElementById(`slide-${slideNumber - 1}-styles`)
        if (oldStyle) {
          oldStyle.remove()
        }
        document.head.appendChild(styleElement)
      }

      setSlideContent(content)
    } catch (error) {
      console.error('Error loading slide:', error)
      setSlideContent(
        `<div style="padding: 50px; text-align: center; color: #D6F4ED;"><h1>Error loading slide ${slideNumber}</h1></div>`,
      )
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Prevent navigation when typing in input fields
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return
    }

    // Enter = next
    if (event.key === 'Enter') {
      event.preventDefault()
      handleNext()
    }
    // Backspace = previous
    else if (event.key === 'Backspace') {
      event.preventDefault()
      handlePrevious()
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ outline: 'none', backgroundColor: '#473472' }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full" style={{ color: '#D6F4ED' }}>
          <div className="text-2xl">Loading slide {currentSlide}...</div>
        </div>
      ) : (
        <div
          ref={slideWrapperRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={slideContentRef}
            className="relative"
            style={{
              width: `${SLIDE_WIDTH}px`,
              minHeight: `${slideHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              boxSizing: 'border-box',
            }}
            dangerouslySetInnerHTML={{ __html: slideContent }}
          />
        </div>
      )}

      {/* Navigation indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg z-50 pointer-events-none" style={{ backgroundColor: 'rgba(71, 52, 114, 0.7)', color: '#D6F4ED' }}>
        <span className="text-sm font-semibold">
          {currentSlide} / {TOTAL_SLIDES}
        </span>
      </div>

      {/* Navigation buttons (optional, for accessibility) */}
      <div
        className="absolute bottom-4 left-4 flex gap-2 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePrevious}
          disabled={currentSlide === 1}
          className="px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ 
            backgroundColor: 'rgba(214, 244, 237, 0.2)', 
            color: '#D6F4ED',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(214, 244, 237, 0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(214, 244, 237, 0.2)'}
          aria-label="Previous slide"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlide === TOTAL_SLIDES}
          className="px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ 
            backgroundColor: 'rgba(214, 244, 237, 0.2)', 
            color: '#D6F4ED',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(214, 244, 237, 0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(214, 244, 237, 0.2)'}
          aria-label="Next slide"
        >
          Next →
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 px-4 py-2 rounded-lg text-sm z-50 pointer-events-none" style={{ backgroundColor: 'rgba(71, 52, 114, 0.7)', color: '#D6F4ED' }}>
        <div>Enter: Next | Backspace: Previous</div>
      </div>
    </div>
  )
}

