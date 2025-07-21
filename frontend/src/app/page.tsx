"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PlacementSystem() {
  const [mounted, setMounted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [internshipData, setInternshipData] = useState({
    internship_name: '',
    min_cgpa: '',
    required_skills: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file first')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://127.0.0.1:8000/upload-students', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (response.ok) {
        setMessage(`Successfully uploaded! Total students: ${result.total_students}`)
      } else {
        setMessage(`Error: ${result.detail}`)
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleNotifyStudents = async () => {
    if (!internshipData.internship_name || !internshipData.min_cgpa || !internshipData.required_skills) {
      setMessage('Please fill all internship details')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          internship_name: internshipData.internship_name,
          min_cgpa: parseFloat(internshipData.min_cgpa),
          required_skills: internshipData.required_skills.split(',').map(skill => skill.trim())
        }),
      })

      const result = await response.json()
      if (response.ok) {
        setMessage(result.message)
      } else {
        setMessage(`Error: ${result.detail}`)
      }
    } catch (error) {
      setMessage(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Placement Management System</h1>
      
      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Student Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Select Excel File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <Button onClick={handleFileUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Students Data'}
          </Button>
        </CardContent>
      </Card>

      {/* Internship Notification Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notify Eligible Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="internship-name">Internship Name</Label>
            <Input
              id="internship-name"
              placeholder="Software Development Internship"
              value={internshipData.internship_name}
              onChange={(e) => setInternshipData({...internshipData, internship_name: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="min-cgpa">Minimum CGPA</Label>
            <Input
              id="min-cgpa"
              type="number"
              step="0.1"
              placeholder="7.5"
              value={internshipData.min_cgpa}
              onChange={(e) => setInternshipData({...internshipData, min_cgpa: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="required-skills">Required Skills (comma-separated)</Label>
            <Input
              id="required-skills"
              placeholder="JavaScript, React, Node.js"
              value={internshipData.required_skills}
              onChange={(e) => setInternshipData({...internshipData, required_skills: e.target.value})}
            />
          </div>
          
          <Button onClick={handleNotifyStudents} disabled={loading}>
            {loading ? 'Sending Notifications...' : 'Notify Eligible Students'}
          </Button>
        </CardContent>
      </Card>

      {/* Message Display */}
      {message && (
        <Card>
          <CardContent className="pt-6">
            <div className={`p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
              {message}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
