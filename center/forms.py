from center.models import passage,blogPassage
from django import forms

class passageForm(forms.ModelForm):
    class Meta:
        model=passage
        fields='__all__'

class blogPassageForm(forms.ModelForm):
    class Meta:
        model=blogPassage
        fields='__all__'